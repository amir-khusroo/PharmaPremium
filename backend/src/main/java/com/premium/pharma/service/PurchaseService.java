package com.premium.pharma.service;

import com.premium.pharma.entity.MedicineItem;
import com.premium.pharma.entity.Purchase;
import com.premium.pharma.entity.Subscription;
import com.premium.pharma.entity.User;
import com.premium.pharma.model.PlanName;
import com.premium.pharma.repository.PurchaseRepository;
import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.PurchaseRequest;
import com.premium.pharma.utils.InvoiceGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PurchaseService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private EmailService emailService;
    //private final InvoiceService invoiceService;

    @Transactional
    public String confirmPurchase(PurchaseRequest request, User partner) {

        Optional<User> patient = userRepository.findByEmail(request.getPatientEmail());
        if (patient.isEmpty()) {
            throw new IllegalArgumentException("Patient not found");
        }

        // Verify OTP
        if (!request.getOtp().equals(patient.get().getOtp())) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        if (patient.get().getOtpGeneratedAt().isBefore(LocalDateTime.now().minusMinutes(20))) {
            throw new IllegalArgumentException("OTP expired");
        }


        // Calculate total and discount
        List<MedicineItem> items = request.getItems().stream().map(dto -> {
            MedicineItem item = new MedicineItem();
            item.setName(dto.getName());
            item.setPrice(dto.getPrice());
            item.setQuantity(dto.getQuantity());
            return item;
        }).collect(Collectors.toList());

        double totalAmount = items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        double discount = calculateDiscount(patient.get(), totalAmount);
        double finalAmount = totalAmount - discount;

        // Create purchase
        Purchase purchase = new Purchase();
        purchase.setDate(LocalDateTime.now());
        purchase.setPatient(patient.get());
        purchase.setPartner(partner);
        purchase.setItems(items);
        purchase.setTotalAmount(totalAmount);
        purchase.setDiscount(discount);
        purchase.setFinalAmount(finalAmount);

        // Set back reference in items
        for (MedicineItem item : items) {
            item.setPurchase(purchase);
        }

        purchaseRepository.save(purchase);

        // Email invoice
        try {
            File invoice = InvoiceGenerator.generateBillInvoicePdf(purchase);
            emailService.sendInvoiceWithAttachment(patient.get().getEmail(), invoice);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send invoice email", e);
        }
        return "Purchase successful and invoice sent.";
    }

    private double calculateDiscount(User patient, double totalAmount) {
        Subscription subscription = patient.getSubscription();
        if (subscription == null || subscription.getEndDate().isBefore(ChronoLocalDate.from(LocalDateTime.now()))) {
            return 0;
        }

        PlanName plan = subscription.getPlanName(); // "BASIC", "PREMIUM", etc.

        switch (plan) {
            case BASIC: return totalAmount * 0.10;
            case PREMIUM: return totalAmount * 0.20;
            default: return 0;
        }
    }
}
