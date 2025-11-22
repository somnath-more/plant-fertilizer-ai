package com.plant_fetlilizer_ai.product_service.service;

import com.plant_fetlilizer_ai.product_service.dto.ProductRequestDto;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductResponseDto> getAllProducts();
    ProductResponseDto getProductById(Long id);
    List<ProductResponseDto> searchProducts(String query);
    List<ProductResponseDto> getProductsByCategory(String category);
    ProductResponseDto createProduct(ProductRequestDto requestDto);
    ProductResponseDto updateStock(Long id, Integer stock);
}
