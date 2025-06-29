package com.premium.pharma.controller;

import com.premium.pharma.entity.SubscriptionType;
import com.premium.pharma.model.PlanName;
import com.premium.pharma.service.SubscriptionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionTypeController {
    @Autowired
    private SubscriptionTypeService createSubscriptionService;

    @PostMapping("/create")
    public ResponseEntity<SubscriptionType> createPlan(@RequestBody SubscriptionType plan) {
        return ResponseEntity.ok(createSubscriptionService.createSubscriptionPlan(plan));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<SubscriptionType>> getPlans() {
        return ResponseEntity.ok(createSubscriptionService.getAllPlans());
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deletePlanByName(@PathVariable("name") PlanName name) {
        createSubscriptionService.deleteByName(name);
        return ResponseEntity.ok("Delete Successfully");
    }
}
