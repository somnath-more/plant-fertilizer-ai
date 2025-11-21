package com.plant_fertilizer_ai.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private Set<String> roles;
}