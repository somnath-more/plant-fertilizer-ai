package com.plant_fetlilizer_ai.product_service.service.impl;

import com.plant_fetlilizer_ai.product_service.config.ProductMapper;
import com.plant_fetlilizer_ai.product_service.dto.ProductRequestDto;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.exception.CustomException;
import com.plant_fetlilizer_ai.product_service.model.Product;
import com.plant_fetlilizer_ai.product_service.repository.ProductRepository;
import com.plant_fetlilizer_ai.product_service.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products=productRepository.findAll();
        List<ProductResponseDto> productResponseDtos= products.stream().map(productMapper::toDto).collect(Collectors.toList());

        return productResponseDtos;
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException( "Product not found",HttpStatus.NOT_FOUND));
        return productMapper.toDto(product);
    }

    @Override
    public List<ProductResponseDto> searchProducts(String query) {
        List<Product> products=productRepository.searchProducts(query);
//        System.out.println("products"+products);
        if (products.isEmpty()) {
            throw new CustomException("No products found for query: " ,HttpStatus.OK);
        }
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String category) {
        List<Product> products=productRepository.findByCategory(category);
//        System.out.println("products"+products);
        if (products.isEmpty()) {
            throw new CustomException("No products found for category: " ,HttpStatus.OK);
        }
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto requestDto) {
        Product product = productMapper.toEntity(requestDto);
        Product product1 = productRepository.save(product);
        return productMapper.toDto(product1);
    }

    @Override
    public ProductResponseDto updateStock(Long id, Integer stock) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException("Product not found with id: " + id,HttpStatus.NOT_FOUND));

        product.setStock(stock);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDto(updatedProduct);
    }

}
