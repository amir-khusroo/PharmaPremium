package com.premium.pharma.requestDto;

import com.premium.pharma.model.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;
}
