package com.premium.pharma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private User patient;

    private LocalDate startDate;
    private LocalDate endDate;

    private String planName;
    private BigDecimal price;

    public boolean isActive() {
        return LocalDate.now().isAfter(startDate) && LocalDate.now().isBefore(endDate);
    }
}
