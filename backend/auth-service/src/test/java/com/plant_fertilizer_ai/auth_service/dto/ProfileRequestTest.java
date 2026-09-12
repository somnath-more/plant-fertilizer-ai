package com.plant_fertilizer_ai.auth_service.dto;

import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProfileRequestTest {
    @Test
    void rejectsPhoneNumbersWithFewerThanSevenDigits() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var validator = factory.getValidator();
            assertFalse(validator.validate(new ProfileRequest("Ada", "Road", "1------")).isEmpty());
            assertTrue(validator.validate(new ProfileRequest("Ada", "Road", "+91 98765 43210")).isEmpty());
        }
    }
}
