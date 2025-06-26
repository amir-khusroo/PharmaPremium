package com.premium.pharma.controller;

import com.premium.pharma.entity.User;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.ForgotPasswordRequest;
import com.premium.pharma.requestDto.OtpVerificationRequest;
import com.premium.pharma.requestDto.ResetPasswordRequest;
import com.premium.pharma.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> sendOtp(@RequestBody ForgotPasswordRequest request) {
        Optional<User> user = userRepository.findByEmail(request.email);
        if (user.isEmpty()) return ResponseEntity.badRequest().body("User not found");
        User user1=user.get();
        if (!user1.isEnabled()) return ResponseEntity.badRequest().body("User not found");
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user1.setOtp(otp);
        user.get().setOtpGeneratedAt(LocalDateTime.now());
        userRepository.save(user1);

        emailService.sendEmail(user.get().getEmail(), "Reset OTP", "Your OTP is: " + otp);

        return ResponseEntity.ok("OTP sent to email");
    }

    // Step 2: Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationRequest request) {
        Optional<User> user = userRepository.findByEmail(request.email);
        if (user.isEmpty()) return ResponseEntity.badRequest().body("Invalid user");
        User user1=user.get();
        if (user1.getOtp().equals(request.otp) && user.get().getOtpGeneratedAt().isAfter(LocalDateTime.now().minusMinutes(10))) {
            return ResponseEntity.ok("OTP verified");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
    }

    // Step 3: Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<User> user = userRepository.findByEmail(request.email);
        if (user.isEmpty()) return ResponseEntity.badRequest().body("User not found");
        User user1=user.get();
        user1.setPassword(passwordEncoder.encode(request.newPassword));
        user1.setOtp(null);
        user1.setOtpGeneratedAt(null);
        userRepository.save(user1);

        return ResponseEntity.ok("Password reset successfully");
    }
}
