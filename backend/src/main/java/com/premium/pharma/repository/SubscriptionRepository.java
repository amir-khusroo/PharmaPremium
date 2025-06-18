package com.premium.pharma.repository;

import com.premium.pharma.entity.Subscription;
import com.premium.pharma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    Optional<Subscription> findByPatient(User patient);
}
