package com.plant_fetlilizer_ai.product_service.repository;

import com.plant_fetlilizer_ai.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Modifying
    @Query("update Product p set p.stock = p.stock - :quantity where p.id = :id and p.stock >= :quantity")
    int decrementStock(@Param("id") Long id, @Param("quantity") Integer quantity);
    List<Product> findByCategory(String category);
    @Query("SELECT p FROM Product p WHERE " + "LOWER(p.name) LIKE LOWER(CONCAT('%',:query,'%')) OR "+"LOWER(p.description) LIKE LOWER(CONCAT('%',:query,'%'))" )
    List<Product> searchProducts(@Param("query") String query);
    List<Product> findByFeaturedTrue();
}
