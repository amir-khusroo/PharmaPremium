package com.premium.pharma.controller;

import com.premium.pharma.entity.Purchase;
import com.premium.pharma.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    @GetMapping("/getPurchaseHistory")
    public ResponseEntity<?> getPurchaseHistory(Authentication auth){
        try {
            List<Purchase> purchaseList=patientService.getAllPurchaseHistory(auth.getName());
            return ResponseEntity.ok(purchaseList);
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body("Invalid Token");
        }
    }
}
