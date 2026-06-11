package com.plant_fetlilizer_ai.product_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.plant_fetlilizer_ai.product_service.constants.Messages;
import com.plant_fetlilizer_ai.product_service.dto.ProductRequest;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.exception.ApiResponse;
import com.plant_fetlilizer_ai.product_service.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/api/v1/products")
@Slf4j
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getAllProducts() {
        log.info("get all products");
        List<ProductResponseDto> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.success(Messages.PRODUCTS_RETRIEVED_SUCCESSFULLY, products, 200, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProduct(@PathVariable Long id) {
        ProductResponseDto product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(Messages.PRODUCT_RETRIEVED_SUCCESSFULLY, product, 200, id));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> searchProducts(@RequestParam String query) {
        List<ProductResponseDto> products = productService.searchProducts(query);
        return ResponseEntity.ok(ApiResponse.success(Messages.PRODUCTS_SEARCHED_SUCCESSFULLY, products, 200, query));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponseDto> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(Messages.PRODUCTS_BY_CATEGORY_RETRIEVED, products, 200, category));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> addProduct(
            @RequestParam("productRequest") String productRequestJson,
            @RequestParam(value = "files", required = false) MultipartFile[] files
    ) {
        try {
            ProductRequest productRequest = objectMapper.readValue(productRequestJson, ProductRequest.class);
            ProductResponseDto saved = productService.addProduct(productRequest, files);
            log.info("Product request: {}", productRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponse.success(Messages.PRODUCT_CREATED_SUCCESSFULLY, saved, 201, saved.getId())
            );
        } catch (Exception e) {
            log.error("Failed to add product", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.error(Messages.INTERNAL_SERVER_ERROR, 500)
            );
        }
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateStock(@PathVariable Long id, @RequestParam Integer stock) {
        ProductResponseDto product = productService.updateStock(id, stock);
        return ResponseEntity.ok(ApiResponse.success(Messages.STOCK_UPDATED_SUCCESSFULLY, product, 200, id));
    }
}
