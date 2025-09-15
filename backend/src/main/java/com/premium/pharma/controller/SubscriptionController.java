package com.premium.pharma.controller;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.entity.SubscriptionType;
import com.premium.pharma.entity.User;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.SubscriptionRequest;
import com.premium.pharma.service.EmailService;
import com.premium.pharma.service.SubscriptionService;
import com.premium.pharma.utils.InvoiceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Optional;

@RestController
@RequestMapping("/api/patient/subscription")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private InvoiceGenerator invoiceGenerator;

    @PostMapping("/buy")
    public ResponseEntity<?> buySubscription(@RequestBody SubscriptionRequest subscriptionRequest, Authentication auth){
        try {
            String username = auth.getName();
            Optional<User> user=userRepository.findByEmail(username);
            if(user.isEmpty()){
                return ResponseEntity.status(401).body("Please Login Again!");
            }
            Subscription sub = subscriptionService.createSubscription(username, subscriptionRequest);
            File pdf = invoiceGenerator.generateSubscriptionInvoice(user.get().getEmail(), subscriptionRequest.getPlanName(), sub.getStartDate(), sub.getEndDate());
            emailService.sendInvoiceWithAttachment(user.get().getEmail(), pdf);
            pdf.delete();

            return ResponseEntity.ok(sub);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/active")
    public ResponseEntity<Boolean> checkActive(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(subscriptionService.isSubscriptionActive(username));
    }
}
