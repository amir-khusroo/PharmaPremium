package com.premium.pharma.entity;

import com.premium.pharma.model.PlanName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    private PlanName planName;

    private int price;

    private int discountPrecentage;

    private int durationInDays;
}
