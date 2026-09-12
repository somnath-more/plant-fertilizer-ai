package com.plant_fertilizer_ai.auth_service.service;

import com.plant_fertilizer_ai.auth_service.dto.ProfileRequest;
import com.plant_fertilizer_ai.auth_service.model.User;
import com.plant_fertilizer_ai.auth_service.repository.UserRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProfileServiceTest {
    @Test
    void updatesOnlyEditableFieldsForTheSelectedUser() {
        UserRepository repository = mock(UserRepository.class);
        User user = new User();
        user.setId(7L);
        user.setName("Old Name");
        user.setEmail("owner@example.com");
        user.setPassword("existing-hash");
        user.setRoles(Set.of("USER"));
        when(repository.findById(7L)).thenReturn(Optional.of(user));
        when(repository.save(user)).thenReturn(user);

        ProfileService service = new ProfileService(repository);
        var response = service.updateProfile(7L,
                new ProfileRequest("  Ada Lovelace  ", "  12 Garden Road  ", "  +91 9876543210  "));

        assertEquals("Ada Lovelace", response.name());
        assertEquals("12 Garden Road", response.address());
        assertEquals("+91 9876543210", response.phone());
        assertEquals("owner@example.com", user.getEmail());
        assertEquals("existing-hash", user.getPassword());
        assertEquals(Set.of("USER"), user.getRoles());
        verify(repository).save(user);
    }

    @Test
    void readsExistingProfileWithoutExposingCredentials() {
        UserRepository repository = mock(UserRepository.class);
        User user = new User();
        user.setName("Ada");
        user.setAddress("12 Garden Road");
        user.setPhone("1234567890");
        user.setPassword("secret");
        when(repository.findById(7L)).thenReturn(Optional.of(user));

        var response = new ProfileService(repository).getProfile(7L);

        assertEquals("Ada", response.name());
        assertEquals("12 Garden Road", response.address());
        assertEquals("1234567890", response.phone());
    }
}
