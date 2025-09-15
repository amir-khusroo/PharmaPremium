package com.premium.pharma.service;

import com.premium.pharma.entity.Purchase;
import com.premium.pharma.entity.User;
import com.premium.pharma.repository.PurchaseRepository;
import com.premium.pharma.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    public List<Purchase> getAllPurchaseHistory(String email) {
        Optional<User>  user= userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }
        return purchaseRepository.findByPatient(user.get());
    }
}
