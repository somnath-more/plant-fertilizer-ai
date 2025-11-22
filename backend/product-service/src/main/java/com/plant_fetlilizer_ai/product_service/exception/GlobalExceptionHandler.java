package com.plant_fetlilizer_ai.product_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    // ⚠ Handle Custom Exception
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(
            CustomException ex, HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.builder()
                .statusCode(ex.getStatus().value())
                .message(ex.getMessage())
                .timestamp(System.currentTimeMillis())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(error, ex.getStatus());
    }


    // ⚠ Handle Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Invalid input");

        ErrorResponse error = ErrorResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(errorMessage)
                .timestamp(System.currentTimeMillis())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    // ⚠ Handle All Other Exceptions (fallback)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception ex, HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(ex.getMessage())
                .timestamp(System.currentTimeMillis())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
