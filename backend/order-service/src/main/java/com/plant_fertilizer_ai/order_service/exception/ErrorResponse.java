package com.plant_fertilizer_ai.order_service.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private int statusCode;
    private String message;
    private long timestamp;
    private String path;
}
