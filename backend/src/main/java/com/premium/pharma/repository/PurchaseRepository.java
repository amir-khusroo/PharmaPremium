package com.premium.pharma.repository;

import com.premium.pharma.entity.Purchase;
import com.premium.pharma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {
    List<Purchase> findByPatient(User patient);

    List<Purchase> findByPartner(User partner);
}
