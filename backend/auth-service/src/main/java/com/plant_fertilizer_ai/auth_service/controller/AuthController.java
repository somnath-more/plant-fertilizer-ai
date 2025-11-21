package com.plant_fertilizer_ai.auth_service.controller;

import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.security.AuthenticationManager;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import com.plant_fertilizer_ai.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    //    Logger
    private final UserService userService;

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        logger.info("Registering user: {}", request);
//        Automatically catches invalid inputs — you do not need to call it manually.
        User user = userService.registerUser(request);

        // Generate token when ready
        String token = "testtoken";

        return ResponseEntity.ok("User registered successfully..phello..");
    }

    @GetMapping("/health")
    public String healthCheck() {
        logger.info("Health check endpoint called .....");
        return "Auth Service is running";
    }
}
