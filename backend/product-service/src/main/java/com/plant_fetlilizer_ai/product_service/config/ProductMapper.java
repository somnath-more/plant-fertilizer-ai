package com.plant_fetlilizer_ai.product_service.config;

import com.plant_fetlilizer_ai.product_service.dto.ProductRequest;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.model.Product;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final ModelMapper mapper;

    public ProductMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    // Request DTO → Entity
    public Product toEntity(ProductRequest dto) {
        return mapper.map(dto, Product.class);
    }

    // Entity → Response DTO
    public ProductResponseDto toDto(Product entity) {
        return mapper.map(entity, ProductResponseDto.class);
    }
}
