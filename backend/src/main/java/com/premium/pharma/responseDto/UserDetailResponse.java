package com.premium.pharma.responseDto;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetailResponse {
    private String email;
    private String name;
    private Subscription subscription;
    private Role role;
    private String username;
}
