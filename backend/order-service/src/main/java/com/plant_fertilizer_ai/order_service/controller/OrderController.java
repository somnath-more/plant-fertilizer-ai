package com.plant_fertilizer_ai.order_service.controller;

import com.plant_fertilizer_ai.order_service.constants.Messages;
import com.plant_fertilizer_ai.order_service.dto.CreateOrderRequest;
import com.plant_fertilizer_ai.order_service.dto.PaymentStatusUpdate;
import com.plant_fertilizer_ai.order_service.exception.ApiResponse;
import com.plant_fertilizer_ai.order_service.model.Order;
import com.plant_fertilizer_ai.order_service.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.success(Messages.ORDER_CREATED_SUCCESSFULLY, order, 201, order.getId())
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Order>>> getUserOrders(@PathVariable Long userId) {
        List<Order> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(
                ApiResponse.success(Messages.USER_ORDERS_RETRIEVED_SUCCESSFULLY, orders, 200, userId)
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<Order>> getOrder(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(
                ApiResponse.success(Messages.ORDER_RETRIEVED_SUCCESSFULLY, order, 200, orderId)
        );
    }

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<ApiResponse<Order>> getOrderByNumber(@PathVariable String orderNumber) {
        Order order = orderService.getOrderByNumber(orderNumber);
        return ResponseEntity.ok(
                ApiResponse.success(Messages.ORDER_RETRIEVED_SUCCESSFULLY, order, 200, orderNumber)
        );
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {
        Order order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(
                ApiResponse.success(Messages.ORDER_STATUS_UPDATED_SUCCESSFULLY, order, 200, orderId)
        );
    }

    @PutMapping("/payment/status")
    public ResponseEntity<ApiResponse<Order>> updatePaymentStatus(@RequestBody PaymentStatusUpdate update) {
        Order order = orderService.updatePaymentStatus(
                update.getOrderNumber(),
                update.getPaymentStatus(),
                update.getTransactionId()
        );
        return ResponseEntity.ok(
                ApiResponse.success(Messages.PAYMENT_STATUS_UPDATED_SUCCESSFULLY, order, 200, update.getOrderNumber())
        );
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<ApiResponse<String>> cancelOrder(@PathVariable Long orderId) {
        String message = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(
                ApiResponse.success(Messages.ORDER_CANCELLED_SUCCESSFULLY, message, 200, orderId)
        );
    }
}
