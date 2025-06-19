package com.premium.pharma.service;

import com.premium.pharma.entity.User;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public String register(RegisterRequest request) {
        Optional<User> existingUser=userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent() && existingUser.get().isEnabled()) {
            return "Username already exists!";
        }

        String otp = generateOtp();

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .otp(otp)
                .enabled(false)
                .otpGeneratedAt(LocalDateTime.now())
                .role(request.getRole())
                .build();

        userRepository.save(user);
        emailService.sendEmail(
                user.getEmail(),
                "Your PharmaPremium OTP",
                "Your OTP is: " + otp + "\nValid for 5 minutes."
        );
        return "OTP is sended in your email!";
    }


    public User authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .orElse(null);
    }

    public boolean verifyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getOtp().equals(otp)) return false;

        Duration diff = Duration.between(user.getOtpGeneratedAt(), LocalDateTime.now());
        if (diff.toMinutes() > 5) return false;

        user.setEnabled(true);
        user.setOtp(null); // Clear OTP
        user.setOtpGeneratedAt(null);
        userRepository.save(user);

        return true;
    }


    public String generateOtp() {
        return String.valueOf((int)(Math.random() * 900000) + 100000); // 6-digit OTP
    }

}
