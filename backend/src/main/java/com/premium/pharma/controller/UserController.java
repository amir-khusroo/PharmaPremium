package com.premium.pharma.controller;

import com.premium.pharma.entity.User;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.RegisterRequest;
import com.premium.pharma.responseDto.UserDetailResponse;
import com.premium.pharma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register( @RequestBody RegisterRequest request) {
        try {
            String result = userService.register(request);
            return ResponseEntity.ok(result);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");

        if (userService.verifyOtp(email, otp)) {
            return ResponseEntity.ok("Email verified & Registration successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP");
        }
    }
    @GetMapping("/{email}")
    public ResponseEntity<UserDetailResponse> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        UserDetailResponse user1=UserDetailResponse.builder()
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .subscription(user.getSubscription())
                .username(user.getUsername())
                .build();
        return ResponseEntity.ok(user1);
    }


}
