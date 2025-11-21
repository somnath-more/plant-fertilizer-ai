package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.model.User;


public interface UserService {
     User registerUser(RegisterRequest request);
//     User userLogin(String email, String password);
    User findByEmail(String email);
    User findById(Long id);

}
