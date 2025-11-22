package com.plant_fertilizer_ai.order_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private Long userId;
    private List<OrderItemDto> items;
    private String shippingAddress;
    private String billingAddress;
    private String paymentMethod;
    private String notes;
}