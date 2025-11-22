 package com.plant_fertilizer_ai.order_service.dto;

import lombok.Data;

@Data
public class PaymentStatusUpdate {
    private String orderNumber;
    private String paymentStatus;
    private String transactionId;
}