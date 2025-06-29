package com.premium.pharma.service;

import com.premium.pharma.model.PlanName;
import com.premium.pharma.repository.SubscriptionTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionTypeService {
    @Autowired
    private SubscriptionTypeRepository createSubscriptionRepository;

    public com.premium.pharma.entity.SubscriptionType createSubscriptionPlan(com.premium.pharma.entity.SubscriptionType subscription) {
        return createSubscriptionRepository.save(subscription);
    }

    public List<com.premium.pharma.entity.SubscriptionType> getAllPlans() {
        return createSubscriptionRepository.findAll();
    }

    public void deleteByName(PlanName name) {
        com.premium.pharma.entity.SubscriptionType plan = createSubscriptionRepository.findByPlanName(name)
                .orElseThrow(() -> new RuntimeException("Plan not found with name: " + name));
        createSubscriptionRepository.delete(plan);
    }
}
