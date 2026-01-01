package com.plant_fertilizer_ai.blog_service.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BlogDto {

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 150, message = "Title must be between 5 and 150 characters")
    private String title;

    @Size(max = 500, message = "Excerpt cannot exceed 500 characters")
    private String excerpt;

    @NotBlank(message = "Content is required")
    @Size(min = 100, max = 10000, message = "Content must be between 100 and 10000 characters")
    private String content;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Author is required")
    private String author;

    @Pattern(
            regexp = "^(http|https)://.*$",
            message = "Image URL must be a valid URL"
    )
    private String imageUrl;

    @NotNull(message = "Published status must be specified")
    private Boolean published = false;


}
