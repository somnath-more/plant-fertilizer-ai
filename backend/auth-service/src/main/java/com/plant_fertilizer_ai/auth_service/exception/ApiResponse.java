package com.plant_fertilizer_ai.auth_service.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final int statusCode;
    private final boolean success;
    private final String message;
    private final T data;
    private final Object uniqueKey;
    private final Object errors;
    private final String timestamp;

    // --- STATIC UTILITY METHODS (Still available for ultra-fast creation) ---

    public static <T> ApiResponse<T> success(String message, T data, int statusCode, Object uniqueKey) {
        return  ApiResponse.<T>builder()
                .statusCode(statusCode)
                .success(statusCode >= 200 && statusCode < 300)
                .message(message)
                .data(data)
                .uniqueKey(uniqueKey)
                .timestamp(Instant.now().toString())
                .build();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return success(message, data, 200, null);
    }

    public static <T> ApiResponse<T> error(String message, int statusCode, Object errors) {
        return ApiResponse.<T>builder()
                .statusCode(statusCode)
                .success(false)
                .message(message)
                .errors(errors)
                .timestamp(Instant.now().toString())
                .build();
    }

    public static <T> ApiResponse<T> error(String message, int statusCode) {
        return error(message, statusCode, null);
    }
}