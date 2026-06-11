package com.plant_fertilizer_ai.order_service.constants;

public class Messages {
    // Success Messages
    public static final String ORDER_CREATED_SUCCESSFULLY = "Order created successfully";
    public static final String ORDER_RETRIEVED_SUCCESSFULLY = "Order retrieved successfully";
    public static final String USER_ORDERS_RETRIEVED_SUCCESSFULLY = "User orders retrieved successfully";
    public static final String ORDER_STATUS_UPDATED_SUCCESSFULLY = "Order status updated successfully";
    public static final String PAYMENT_STATUS_UPDATED_SUCCESSFULLY = "Payment status updated successfully";
    public static final String ORDER_CANCELLED_SUCCESSFULLY = "Order cancelled successfully";
    
    // Error Messages
    public static final String ORDER_NOT_FOUND = "Order not found";
    public static final String INVALID_ORDER_ID = "Invalid order ID";
    public static final String INVALID_ORDER_DATA = "Invalid order data provided";
    public static final String ORDER_CANNOT_BE_CANCELLED = "Order cannot be cancelled at this stage";
    public static final String INVALID_PAYMENT_STATUS = "Invalid payment status";
    public static final String INTERNAL_SERVER_ERROR = "An internal server error occurred";
}
