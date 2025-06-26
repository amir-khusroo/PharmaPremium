package com.premium.pharma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private LocalDateTime date;

    @ManyToOne
    private User patient;

    @ManyToOne
    private User partner;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL)
    private List<MedicineItem> items;

    private double totalAmount;
    private double discount;
    private double finalAmount;
}
