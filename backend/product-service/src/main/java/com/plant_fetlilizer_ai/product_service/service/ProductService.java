package com.plant_fetlilizer_ai.product_service.service;

import com.plant_fetlilizer_ai.product_service.dto.ProductRequest;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.model.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<ProductResponseDto> getAllProducts();
    ProductResponseDto getProductById(Long id);
    List<ProductResponseDto> searchProducts(String query);
    List<ProductResponseDto> getProductsByCategory(String category);
    ProductResponseDto addProduct(ProductRequest requestDto, MultipartFile[] files);
    ProductResponseDto updateStock(Long id, Integer stock);
}
