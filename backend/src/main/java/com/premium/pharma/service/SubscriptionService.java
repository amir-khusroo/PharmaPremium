package com.premium.pharma.service;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.entity.SubscriptionType;
import com.premium.pharma.entity.User;
import com.premium.pharma.model.Role;
import com.premium.pharma.repository.SubscriptionRepository;
import com.premium.pharma.repository.SubscriptionTypeRepository;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.SubscriptionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionTypeRepository subscriptionTypeRepository;


    public Subscription createSubscription(String email, SubscriptionRequest request) {
        User patient = userRepository.findByEmail(email)
                .filter(user -> user.getRole() == Role.PATIENT)
                .orElseThrow(() -> new RuntimeException("User not found or not a patient"));

        SubscriptionType subscriptionType=subscriptionTypeRepository.findByPlanName(request.getPlanName())
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(subscriptionType.getDurationInDays());

        Subscription subscription = Subscription.builder()
                .patient(patient)
                .startDate(start)
                .endDate(end)
                .subscriptionType(subscriptionType)
                .build();

        return subscriptionRepository.save(subscription);
    }

    public boolean isSubscriptionActive(String username) {
        User patient = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return subscriptionRepository.findByPatient(patient)
                .map(Subscription::isActive)
                .orElse(false);
    }
}
