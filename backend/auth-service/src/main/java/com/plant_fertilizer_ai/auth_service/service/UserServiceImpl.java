package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.RegisterRequest;
import com.plant_fertilizer_ai.auth_service.exception.CustomException;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.repository.UserRepository;
import com.plant_fertilizer_ai.auth_service.security.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.plant_fertilizer_ai.auth_service.constants.Messages.*;

@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

//    @AllArgsConstructor --> it will generate constructor with all arguments

//    Logger logger = Logger.getLogger(UserServiceImpl.class.getName());

    @Override
    public Optional<?> registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRoles(Set.of("USER"));

        Map<String, Object> claims=new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("roles", user.getRoles());


        String token=jwtUtil.generateToken(user.getName(), claims);

        User user1= userRepository.save(user);
        log.info("User registered successfully: {}", user1.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user1);
        response.put("message",USER_REGISTER_SUCCESS);
        return Optional.of(response);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
