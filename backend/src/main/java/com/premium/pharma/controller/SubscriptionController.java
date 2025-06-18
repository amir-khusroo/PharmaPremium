package com.premium.pharma.controller;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.requestDto.SubscriptionRequest;
import com.premium.pharma.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient/subscription")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/buy")
    public ResponseEntity<?> buySubscription(@RequestBody SubscriptionRequest subscriptionRequest, Authentication auth){
        try {
            String username = auth.getName();
            Subscription sub = subscriptionService.createSubscription(username, subscriptionRequest);
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
