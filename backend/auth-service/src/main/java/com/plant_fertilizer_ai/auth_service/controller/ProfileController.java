package com.plant_fertilizer_ai.auth_service.controller;

import com.plant_fertilizer_ai.auth_service.dto.ProfileRequest;
import com.plant_fertilizer_ai.auth_service.dto.ProfileResponse;
import com.plant_fertilizer_ai.auth_service.exception.ApiResponse;
import com.plant_fertilizer_ai.auth_service.exception.CustomException;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import com.plant_fertilizer_ai.auth_service.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileResponse>> getProfile(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        return ResponseEntity.ok(ApiResponse.success("Profile loaded", profileService.getProfile(userId(authorization))));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProfileResponse>> updateProfile(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @Valid @RequestBody ProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated", profileService.updateProfile(userId(authorization), request)));
    }

    private Long userId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new CustomException("Sign in to manage your profile", HttpStatus.UNAUTHORIZED);
        }
        try {
            Object claim = jwtUtil.extractClaim(authorization.substring(7), claims -> claims.get("userId"));
            if (claim instanceof Number number) {
                return number.longValue();
            }
        } catch (RuntimeException ignored) {
            // An invalid signature, expired token, or malformed claim is unauthorized.
        }
        throw new CustomException("Invalid or expired session", HttpStatus.UNAUTHORIZED);
    }
}
