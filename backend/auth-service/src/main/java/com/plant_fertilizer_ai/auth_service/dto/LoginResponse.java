package com.plant_fertilizer_ai.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private Set<String> roles;
}