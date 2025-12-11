package com.plant_fertilizer_ai.order_service.repository;

import com.plant_fertilizer_ai.order_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

//    SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC;
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

//    @Query("SELECT o FROM Order o WHERE o.orderNumber = :orderNumber")
//   Order getOrderByOrderNumber(@Param("orderNumber") String orderNumber);
    Optional<Order> findByOrderNumber(String orderNumber);

}
