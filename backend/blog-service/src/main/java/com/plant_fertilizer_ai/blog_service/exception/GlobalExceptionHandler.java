package com.plant_fertilizer_ai.blog_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle Custom Business Exceptions
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Void>> handleCustomException(CustomException ex, HttpServletRequest request) {
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(ex.getStatus().value())
                .success(false)
                .message(ex.getMessage())
                .errors(createBaseErrorDetails(request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, ex.getStatus());
    }

    // 2. Handle Validation Errors (@Valid DTO failures)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .success(false)
                .message("Validation failed")
                .errors(createValidationErrorDetails(ex, request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // ⭐ NEW: Handle Bad JSON syntax sent by frontend
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleMalformedJson(HttpMessageNotReadableException ex, HttpServletRequest request) {
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .success(false)
                .message("Malformed JSON request body or invalid data types.")
                .errors(createBaseErrorDetails(request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // ⭐ NEW: Handle calling endpoints with wrong URL variables (e.g. text instead of numerical ID)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        String message = String.format("Parameter '%s' expects type '%s' but received value '%s'",
                ex.getName(), ex.getRequiredType().getSimpleName(), ex.getValue());

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .success(false)
                .message(message)
                .errors(createBaseErrorDetails(request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // ⭐ NEW: Handle HTTP Method Mismatch (e.g., calling POST instead of PUT)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        String message = String.format("HTTP Method '%s' not supported for this URL path. Supported methods: %s",
                ex.getMethod(), ex.getSupportedHttpMethods());

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.METHOD_NOT_ALLOWED.value())
                .success(false)
                .message(message)
                .errors(createBaseErrorDetails(request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    // 3. Fallback for All Other Runtime/System Crashes
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex, HttpServletRequest request) {
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .success(false)
                .message("An unexpected system error occurred: " + ex.getMessage())
                .errors(createBaseErrorDetails(request))
                .timestamp(Instant.now().toString())
                .build();

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // --- REUSABLE PRIVATE HELPER METHODS ---

    private Map<String, Object> createBaseErrorDetails(HttpServletRequest request) {
        Map<String, Object> details = new HashMap<>();
        details.put("path", request.getRequestURI());
        return details;
    }

    private Map<String, Object> createValidationErrorDetails(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("path", request.getRequestURI());

        Map<String, String> fields = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
                fields.put(err.getField(), err.getDefaultMessage())
        );

        errorDetails.put("validationErrors", fields);
        return errorDetails;
    }
}