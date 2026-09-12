package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.ProfileRequest;
import com.plant_fertilizer_ai.auth_service.dto.ProfileResponse;
import com.plant_fertilizer_ai.auth_service.exception.CustomException;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(Long userId) {
        return toResponse(findUser(userId));
    }

    @Transactional
    public ProfileResponse updateProfile(Long userId, ProfileRequest request) {
        User user = findUser(userId);
        user.setName(request.name().trim());
        user.setAddress(trimToEmpty(request.address()));
        user.setPhone(trimToEmpty(request.phone()));
        return toResponse(userRepository.save(user));
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
    }

    private ProfileResponse toResponse(User user) {
        return new ProfileResponse(user.getName(), user.getAddress(), user.getPhone());
    }

    private String trimToEmpty(String value) {
        return value == null ? "" : value.trim();
    }
}
