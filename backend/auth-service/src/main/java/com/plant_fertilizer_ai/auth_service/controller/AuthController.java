package com.plant_fertilizer_ai.auth_service.controller;

import com.plant_fertilizer_ai.auth_service.dto.LoginRequest;
import com.plant_fertilizer_ai.auth_service.dto.LoginResponse;
import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import com.plant_fertilizer_ai.auth_service.service.AuthService;
import com.plant_fertilizer_ai.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authService = authService;
    }

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        logger.info("Registering user: {}", request);
        Optional<?> registerResponse = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.OK).body(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Logging in user with email: {}", loginRequest.getEmail());
        // Authenticate user
        LoginResponse loginResponse = authService.authenticate(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/health")
    public String healthCheck() {
        logger.info("Health check endpoint called .....");
        return "Auth Service is running";
    }
}
