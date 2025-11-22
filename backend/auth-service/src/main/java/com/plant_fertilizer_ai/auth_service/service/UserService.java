package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.model.User;

import java.util.Optional;


public interface UserService {
     Optional<?> registerUser(RegisterRequest request);
//     User userLogin(String email, String password);
    User findByEmail(String email);
    User findById(Long id);

}
