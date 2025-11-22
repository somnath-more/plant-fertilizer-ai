package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.LoginRequest;
import com.plant_fertilizer_ai.auth_service.dto.LoginResponse;

public interface AuthService {
    public LoginResponse authenticate(LoginRequest loginRequest);
}
