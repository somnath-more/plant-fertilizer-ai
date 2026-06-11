package com.plant_fertilizer_ai.auth_service.controller;

import com.plant_fertilizer_ai.auth_service.constants.Messages;
import com.plant_fertilizer_ai.auth_service.dto.LoginRequest;
import com.plant_fertilizer_ai.auth_service.dto.LoginResponse;
import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.exception.ApiResponse;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import com.plant_fertilizer_ai.auth_service.service.AuthService;
import com.plant_fertilizer_ai.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Value("${instagram.channel.url}")
    private String instagramChannel;
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authService = authService;
    }

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody RegisterRequest request) {
        logger.info("Registering user: {}", request);
        Optional<?> registerResponse = userService.registerUser(request);
        if (registerResponse.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponse.success(Messages.USER_REGISTER_SUCCESS, registerResponse.get(), 201, null)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.error(Messages.EMAIL_ALREADY_EXISTS, 400)
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Logging in user with email: {}", loginRequest.getEmail());
        LoginResponse loginResponse = authService.authenticate(loginRequest);
        return ResponseEntity.ok(ApiResponse.success(Messages.LOGIN_SUCCESS, loginResponse, 200, loginRequest.getEmail()));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        logger.info("Health check endpoint called .....");
        String healthMessage = "Auth Service is running | Instagram Channel: " + instagramChannel;
        return ResponseEntity.ok(ApiResponse.success(Messages.SERVICE_HEALTHY, healthMessage, 200, null));
    }
}
