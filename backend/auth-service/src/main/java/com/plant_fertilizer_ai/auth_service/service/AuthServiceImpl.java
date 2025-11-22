package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.LoginRequest;
import com.plant_fertilizer_ai.auth_service.dto.LoginResponse;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor  // it will generate all arguments constructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final UserService userService;


    @Override
    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("roles", user.getRoles());
        jwtUtil.generateToken(loginRequest.getEmail(), claims);



        return LoginResponse.builder()
                .token(jwtUtil.generateToken(loginRequest.getEmail(), claims))
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();
    }

}
