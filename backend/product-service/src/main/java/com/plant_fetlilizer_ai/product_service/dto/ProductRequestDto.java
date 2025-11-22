package com.plant_fetlilizer_ai.product_service.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequestDto {

    @NotBlank(message = "Product name is required")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.1", message = "Price must be at least 0.1")
    private BigDecimal price;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @NotBlank(message = "Category is required")
    private String category;

    private String imageUrl;
    private String npkRatio;
    private String weight;

    private Boolean organic = true;
    private Boolean featured = false;
}
