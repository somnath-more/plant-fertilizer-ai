package com.plant_fertilizer_ai.order_service.service.Imple;

import com.plant_fertilizer_ai.order_service.constants.Messages;
import com.plant_fertilizer_ai.order_service.client.ProductClient;
import com.plant_fertilizer_ai.order_service.dto.CreateOrderRequest;
import com.plant_fertilizer_ai.order_service.dto.VerifyPaymentRequest;
import com.plant_fertilizer_ai.order_service.enums.OrderStatus;
import com.plant_fertilizer_ai.order_service.exception.CustomException;
import com.plant_fertilizer_ai.order_service.model.Order;
import com.plant_fertilizer_ai.order_service.model.OrderItem;
import com.plant_fertilizer_ai.order_service.repository.OrderRepository;
import com.plant_fertilizer_ai.order_service.service.OrderService;
import jakarta.transaction.Transactional;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static com.plant_fertilizer_ai.order_service.constants.Messages.*;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;
    private final String razorpayKeyId;
    private final String razorpayKeySecret;

    public OrderServiceImpl(OrderRepository orderRepository, ProductClient productClient,
                            @Value("${razorpay.key-id:}") String razorpayKeyId,
                            @Value("${razorpay.key-secret:}") String razorpayKeySecret) {
        this.orderRepository = orderRepository;
        this.productClient = productClient;
        this.razorpayKeyId = razorpayKeyId;
        this.razorpayKeySecret = razorpayKeySecret;
    }

    @Override
    @Transactional
    public Order placeOrder(CreateOrderRequest request) {
        validateOrderRequest(request);

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setShippingAddress(request.getShippingAddress());
        order.setBillingAddress(request.getBillingAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setNotes(request.getNotes());

        BigDecimal subtotal = BigDecimal.ZERO;

        for (var itemDto : request.getItems()) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProductId(itemDto.getProductId());
            item.setProductName(itemDto.getProductName());
            item.setQuantity(itemDto.getQuantity());
            item.setPrice(itemDto.getPrice());

            BigDecimal itemSubtotal = itemDto.getPrice()
                    .multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            item.setSubtotal(itemSubtotal);

            order.getItems().add(item); //IMP
            subtotal = subtotal.add(itemSubtotal);
        }

        order.setSubtotal(subtotal);

        // Calculate shipping (free if subtotal > 500)
        BigDecimal shipping = subtotal.compareTo(new BigDecimal("500")) > 0
                ? BigDecimal.ZERO
                : new BigDecimal("50");
        order.setShipping(shipping);

        order.setTotal(subtotal.add(shipping));

        Order savedOrder = orderRepository.save(order);
        if ("ONLINE".equalsIgnoreCase(request.getPaymentMethod())) {
            createRazorpayOrder(savedOrder);
            savedOrder.setStatus(OrderStatus.PAYMENT_PROCESSING);
            savedOrder = orderRepository.save(savedOrder);
            savedOrder.setRazorpayKeyId(razorpayKeyId);
        } else {
            reduceInventory(savedOrder);
            savedOrder.setStatus(OrderStatus.CONFIRMED);
            savedOrder = orderRepository.save(savedOrder);
        }
        return savedOrder;
    }

    private void createRazorpayOrder(Order order) {
        requireRazorpayConfiguration();
        try {
            JSONObject options = new JSONObject();
            options.put("amount", order.getTotal().movePointRight(2).longValueExact());
            options.put("currency", "INR");
            options.put("receipt", order.getOrderNumber());
            com.razorpay.Order razorpayOrder = new RazorpayClient(razorpayKeyId, razorpayKeySecret)
                    .orders.create(options);
            order.setRazorpayOrderId(razorpayOrder.get("id"));
        } catch (Exception ex) {
            throw new CustomException("Unable to create Razorpay order: " + ex.getMessage(), HttpStatus.BAD_GATEWAY);
        }
    }

    @Override
    @Transactional
    public Order verifyPayment(VerifyPaymentRequest request) {
        if (request == null || isBlank(request.getRazorpayOrderId()) || isBlank(request.getRazorpayPaymentId())
                || isBlank(request.getRazorpaySignature())) {
            throw new CustomException("Razorpay order id, payment id and signature are required", HttpStatus.BAD_REQUEST);
        }
        Order order = orderRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new CustomException("Order not found for this Razorpay payment", HttpStatus.NOT_FOUND));
        if ("COMPLETED".equals(order.getPaymentStatus())) {
            return order;
        }
        requireRazorpayConfiguration();
        try {
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", request.getRazorpayOrderId());
            attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
            attributes.put("razorpay_signature", request.getRazorpaySignature());
            if (!Utils.verifyPaymentSignature(attributes, razorpayKeySecret)) {
                order.setPaymentStatus("FAILED");
                order.setStatus(OrderStatus.PAYMENT_FAILED);
                orderRepository.save(order);
                throw new CustomException("Invalid Razorpay payment signature", HttpStatus.BAD_REQUEST);
            }
        } catch (CustomException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomException("Payment verification failed: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        reduceInventory(order);
        order.setPaymentStatus("COMPLETED");
        order.setPaymentTransactionId(request.getRazorpayPaymentId());
        order.setStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);
    }

    private void reduceInventory(Order order) {
        order.getItems().forEach(item -> productClient.reduceStock(item.getProductId(), item.getQuantity()));
    }

    private void requireRazorpayConfiguration() {
        if (isBlank(razorpayKeyId) || isBlank(razorpayKeySecret)) {
            throw new CustomException("Razorpay credentials are not configured", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private void validateOrderRequest(CreateOrderRequest request) {
        if (request == null || request.getUserId() == null) {
            throw new CustomException("User is required to place an order", HttpStatus.BAD_REQUEST);
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new CustomException("Order must contain at least one item", HttpStatus.BAD_REQUEST);
        }
        if (request.getShippingAddress() == null || request.getShippingAddress().isBlank()) {
            throw new CustomException("Shipping address is required", HttpStatus.BAD_REQUEST);
        }
        if (request.getPaymentMethod() == null || request.getPaymentMethod().isBlank()) {
            throw new CustomException("Payment method is required", HttpStatus.BAD_REQUEST);
        }

        request.getItems().forEach(item -> {
            if (item.getProductId() == null || item.getProductName() == null || item.getProductName().isBlank()) {
                throw new CustomException("Each order item must contain a product", HttpStatus.BAD_REQUEST);
            }
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new CustomException("Item quantity must be greater than zero", HttpStatus.BAD_REQUEST);
            }
            if (item.getPrice() == null || item.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new CustomException("Item price must be greater than zero", HttpStatus.BAD_REQUEST);
            }
        });
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new CustomException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new CustomException(ORDER_NOT_FOUND,HttpStatus.NOT_FOUND));
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }

    @Transactional
    public Order updatePaymentStatus(String orderNumber, String paymentStatus, String transactionId) {
        Order order = getOrderByNumber(orderNumber);
        order.setPaymentStatus(paymentStatus);
        order.setPaymentTransactionId(transactionId);

        if ("COMPLETED".equals(paymentStatus)) {
            order.setStatus(OrderStatus.PAYMENT_COMPLETED);
        } else if ("FAILED".equals(paymentStatus)) {
            order.setStatus(OrderStatus.PAYMENT_FAILED);
        }

        return orderRepository.save(order);
    }

    @Transactional
    public String cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return Messages.ORDER_CANCELLED_SUCCESSFULLY;
    }


}
