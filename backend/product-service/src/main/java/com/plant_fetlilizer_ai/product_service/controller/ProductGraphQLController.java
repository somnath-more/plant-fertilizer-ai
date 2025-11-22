// File: product-service/src/main/java/com/organicfert/product/graphql/ProductGraphQLController.java
package com.plant_fetlilizer_ai.product_service.controller;


import com.plant_fetlilizer_ai.product_service.dto.ProductRequestDto;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.model.Product;
import com.plant_fetlilizer_ai.product_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ProductGraphQLController {
    
    private final ProductService productService;
    
    @QueryMapping
    public List<ProductResponseDto> products() {
        return productService.getAllProducts();
    }
    
    @QueryMapping
    public ProductResponseDto product(@Argument Long id) {
        return productService.getProductById(id);
    }
    
    @QueryMapping
    public List<ProductResponseDto> searchProducts(@Argument String query) {
        return productService.searchProducts(query);
    }
    
    @QueryMapping
    public List<ProductResponseDto> productsByCategory(@Argument String category) {
        return productService.getProductsByCategory(category);
    }
    
    @MutationMapping
    public ProductResponseDto createProduct(
        @Argument String name,
        @Argument String description,
        @Argument BigDecimal price,
        @Argument Integer stock,
        @Argument String category
    ) {
        ProductRequestDto productRequestDto = new ProductRequestDto();
        productRequestDto.setName(name);
        productRequestDto.setDescription(description);
        productRequestDto.setPrice(price);
        productRequestDto.setStock(stock);
        productRequestDto.setCategory(category);
        return productService.createProduct(productRequestDto);
    }
    
    @MutationMapping
    public ProductResponseDto updateProductStock(@Argument Long id, @Argument Integer stock) {
        return productService.updateStock(id, stock);
    }
}
