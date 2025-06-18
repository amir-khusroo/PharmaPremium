package com.premium.pharma.controller;

import com.premium.pharma.repository.UserRepository;
import com.premium.pharma.requestDto.RegisterRequest;
import com.premium.pharma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register( @RequestBody RegisterRequest request) {
        try {
            String result = userService.register(request);
            return ResponseEntity.ok(result);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
