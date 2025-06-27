package com.premium.pharma.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.premium.pharma.model.PlanName;
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
    @JsonBackReference
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private User patient;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private PlanName planName;

    private BigDecimal price;

    public boolean isActive() {
        return !LocalDate.now().isBefore(startDate) && !LocalDate.now().isAfter(endDate);
    }
}
