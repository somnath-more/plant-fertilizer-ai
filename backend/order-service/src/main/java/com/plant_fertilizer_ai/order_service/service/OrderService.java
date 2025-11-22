package com.plant_fertilizer_ai.order_service.service;

import com.plant_fertilizer_ai.order_service.dto.CreateOrderRequest;
import com.plant_fertilizer_ai.order_service.model.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    Order createOrder(CreateOrderRequest request);
    List<Order> getUserOrders(Long userId);
    Order getOrderById(Long orderId);
    Order getOrderByNumber(String orderNumber);
    Order updateOrderStatus(Long orderId, String status);
    Order updatePaymentStatus(String orderNumber, String paymentStatus, String transactionId);
   String cancelOrder(Long orderId);

}
