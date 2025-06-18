package com.premium.pharma.service;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.repository.SubscriptionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SubscriptionNotifier {
    private final SubscriptionRepository subscriptionRepository;
    private final EmailService emailService;

    public SubscriptionNotifier(SubscriptionRepository subscriptionRepository, EmailService emailService) {
        this.subscriptionRepository = subscriptionRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 9 * * ?") // Every day at 9 AM
    public void notifyExpiringSubscriptions() {
        LocalDate today = LocalDate.now();
        LocalDate notifyThreshold = today.plusDays(7);


        List<Subscription> expiring = subscriptionRepository.findAll().stream()
                .filter(sub -> {
                    LocalDate endDate = sub.getEndDate();
                    return endDate != null && !endDate.isBefore(today) && !endDate.isAfter(notifyThreshold);
                })
                .toList();

        for (Subscription sub : expiring) {
            if (sub.getPatient() == null || sub.getPatient().getEmail() == null) continue;

            String to = sub.getPatient().getEmail();
            String username = sub.getPatient().getEmail();

            String subject = "PharmaPremium: Subscription Expiring Soon!";
            String content = "Hi " + username + ",\n\nYour subscription will expire on " +
                    sub.getEndDate() + ". Please renew soon to continue enjoying your benefits.\n\n" +
                    "Thank you,\nPharmaPremium Team";

            emailService.sendEmail(to, subject, content);
        }
    }
}
