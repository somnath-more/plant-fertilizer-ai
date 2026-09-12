package com.plant_fertilizer_ai.auth_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ProfileRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must be 100 characters or fewer")
        String name,
        @Size(max = 255, message = "Address must be 255 characters or fewer")
        String address,
        @Pattern(regexp = "^(?:$|(?=(?:[^0-9]*[0-9]){7,15}[^0-9]*$)\\+?[0-9][0-9 ()-]{6,29})$", message = "Enter a valid phone number")
        String phone
) {}
