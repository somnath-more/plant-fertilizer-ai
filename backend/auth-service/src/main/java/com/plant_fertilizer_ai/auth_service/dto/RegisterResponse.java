package com.plant_fertilizer_ai.auth_service.dto;

import com.plant_fertilizer_ai.auth_service.model.User;
import lombok.AllArgsConstructor;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {
    private String token;
    private User user;
    private String message;
}
