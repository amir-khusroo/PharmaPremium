package com.premium.pharma.requestDto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PurchaseRequest {
    private String patientEmail;
    private String otp;
    private List<MedicineItemDto> items;

    @Data
    public static class MedicineItemDto {
        private String name;
        private double price;
        private int quantity;
    }
}
