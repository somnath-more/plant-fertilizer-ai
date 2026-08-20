package com.plant_fertilizer_ai.order_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VerifyPaymentRequest {
    @JsonProperty("razorpay_order_id")
    private String razorpayOrderId;

    @JsonProperty("razorpay_payment_id")
    private String razorpayPaymentId;

    @JsonProperty("razorpay_signature")
    private String razorpaySignature;
}
