package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.LoginResponse;
import com.plant_fertilizer_ai.auth_service.exception.CustomException;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.repository.UserRepository;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class OAuthService {
    private final JwtDecoder jwtDecoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final String clientId;

    public OAuthService(
            JwtDecoder jwtDecoder,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            @Value("${google.client-id}") String clientId) {
        this.jwtDecoder = jwtDecoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.clientId = clientId;
    }

    public LoginResponse exchange(String idToken) {
        final Jwt identity;
        try {
            identity = jwtDecoder.decode(idToken);
        } catch (RuntimeException exception) {
            throw new CustomException("Invalid or expired Google sign-in", HttpStatus.UNAUTHORIZED);
        }

        if (!identity.getAudience().contains(clientId)) {
            throw new CustomException("Google sign-in was issued for another application", HttpStatus.UNAUTHORIZED);
        }

        String email = identity.getClaimAsString("email");
        Boolean emailVerified = identity.getClaim("email_verified");
        if (email == null || !Boolean.TRUE.equals(emailVerified)) {
            throw new CustomException("A verified email address is required", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User created = new User();
            created.setEmail(email);
            created.setName(identity.getClaimAsString("name") == null ? email : identity.getClaimAsString("name"));
            created.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            created.setRoles(new HashSet<>(Set.of("USER")));
            return userRepository.save(created);
        });

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("roles", user.getRoles());
        String token = jwtUtil.generateToken(user.getEmail(), claims);

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();
    }
}
