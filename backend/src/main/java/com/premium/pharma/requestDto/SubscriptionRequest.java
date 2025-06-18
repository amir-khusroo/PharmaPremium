package com.premium.pharma.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequest {
    private String planName;
    private BigDecimal price;
    private int durationInDays;
}
