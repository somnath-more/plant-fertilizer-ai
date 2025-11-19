package com.plant_fetlilizer_ai.auth_service.controller;

import com.plant_fetlilizer_ai.auth_service.model.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
//    Logger
     Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        logger.info("Registering user: {}", user.toString());
        // Registration logic goes here
        return "User registered successfully";
    }
    @GetMapping("/health")
    public String healthCheck() {
        logger.info("Health check endpoint called .....");
        return "Auth Service is running";
    }
}
