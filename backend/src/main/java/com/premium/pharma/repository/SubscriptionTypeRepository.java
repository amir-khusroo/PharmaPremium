package com.premium.pharma.repository;

import com.premium.pharma.entity.SubscriptionType;
import com.premium.pharma.model.PlanName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionTypeRepository extends JpaRepository<com.premium.pharma.entity.SubscriptionType, UUID> {

    Optional<SubscriptionType> findByPlanName(PlanName name);
}
