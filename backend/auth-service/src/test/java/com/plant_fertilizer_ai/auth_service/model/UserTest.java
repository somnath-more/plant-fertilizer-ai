package com.plant_fertilizer_ai.auth_service.model;

import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {
    @Test
    public void testUserCreationAndGetters() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPassword("securepassword");
        user.setName("Test User");
        user.setRoles(Collections.singleton("ROLE_USER"));
       System.out.println("User object in test: " + user);
        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertTrue(user.isEnabled());
        assertNotNull(user.getCreatedAt());

    }

}
