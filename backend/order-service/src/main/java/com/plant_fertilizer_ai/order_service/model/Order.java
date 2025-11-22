// File: order-service/src/main/java/com/organicfert/order/model/Order.java
package com.plant_fertilizer_ai.order_service.model;

import com.plant_fertilizer_ai.order_service.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
    
    @Column(precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal shipping;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal total;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(length = 500,nullable = true)
    private String shippingAddress;
    
    @Column(length = 500)
    private String billingAddress;
    
    private String paymentMethod;
    
    private String paymentStatus = "PENDING";
    
    private String paymentTransactionId;
    
    private LocalDateTime orderDate = LocalDateTime.now();
    
    private LocalDateTime deliveryDate;
    
    private String notes;
    
    @PrePersist
    public void generateOrderNumber() {
        if (orderNumber == null) {
            orderNumber = "ORD-" + System.currentTimeMillis();
        }
    }
}