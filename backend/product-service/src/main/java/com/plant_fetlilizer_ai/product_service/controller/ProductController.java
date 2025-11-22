package com.plant_fetlilizer_ai.product_service.controller;

import com.plant_fetlilizer_ai.product_service.dto.ProductRequestDto;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.model.Product;
import com.plant_fetlilizer_ai.product_service.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDto>> searchProducts(@RequestParam String query) {
        return ResponseEntity.ok(productService.searchProducts(query));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(@RequestBody ProductRequestDto requestDto) {
        return ResponseEntity.ok(productService.createProduct(requestDto));
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<ProductResponseDto> updateStock(@PathVariable Long id, @RequestParam Integer stock) {
        return ResponseEntity.ok(productService.updateStock(id, stock));
    }
}
