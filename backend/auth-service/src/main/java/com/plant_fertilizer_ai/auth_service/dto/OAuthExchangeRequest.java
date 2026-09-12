package com.plant_fertilizer_ai.auth_service.dto;

import jakarta.validation.constraints.NotBlank;

public record OAuthExchangeRequest(@NotBlank String idToken) {
}
