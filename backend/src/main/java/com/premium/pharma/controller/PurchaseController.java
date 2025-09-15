package com.premium.pharma.controller;

import com.premium.pharma.entity.MedicineItem;
import com.premium.pharma.entity.Purchase;
import com.premium.pharma.entity.User;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.PurchaseRequest;
import com.premium.pharma.service.EmailService;
import com.premium.pharma.service.PurchaseService;
import com.premium.pharma.utils.InvoiceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/medicine/purchase")
public class PurchaseController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) return ResponseEntity.status(404).body("Patient not found");
        User patient=user.get();
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        patient.setOtp(otp);
        patient.setOtpGeneratedAt(LocalDateTime.now());
        userRepository.save(patient);

        emailService.sendEmail(email, "Purchase Validation Code", "code: " + otp+ "\nValid for 20 minutes.");

        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPurchase(@RequestBody PurchaseRequest req, Authentication auth) {
        Optional<User> partner=userRepository.findByEmail(auth.getName());
        if (partner.isEmpty()){
            return ResponseEntity.status(401).body("Please Login Again!");
        }
        String result = purchaseService.confirmPurchase(req,partner.get());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/history")
    public ResponseEntity<?> purchaseHistoryOfPartner(Authentication auth){
        List<Purchase> purchases=purchaseService.getAllPurchase(auth.getName());
        return  ResponseEntity.ok(purchases);
    }

}
