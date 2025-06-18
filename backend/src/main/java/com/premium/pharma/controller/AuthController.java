package com.premium.pharma.controller;

import com.premium.pharma.entity.User;
import com.premium.pharma.requestDto.AuthRequest;
import com.premium.pharma.responseDto.JwtResponse;
import com.premium.pharma.security.JwtHelper;
import com.premium.pharma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtHelper.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
