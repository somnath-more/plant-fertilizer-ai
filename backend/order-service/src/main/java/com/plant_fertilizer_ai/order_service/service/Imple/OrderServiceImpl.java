package com.plant_fertilizer_ai.order_service.service.Imple;

import com.plant_fertilizer_ai.order_service.dto.CreateOrderRequest;
import com.plant_fertilizer_ai.order_service.enums.OrderStatus;
import com.plant_fertilizer_ai.order_service.exception.CustomException;
import com.plant_fertilizer_ai.order_service.model.Order;
import com.plant_fertilizer_ai.order_service.model.OrderItem;
import com.plant_fertilizer_ai.order_service.repository.OrderRepository;
import com.plant_fertilizer_ai.order_service.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static com.plant_fertilizer_ai.order_service.constants.Messages.*;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
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

        return orderRepository.save(order);
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
        return ORDER_CANCELLED_SUCCESS;
    }


}
