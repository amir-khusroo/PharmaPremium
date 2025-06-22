package com.premium.pharma.requestDto;

import com.premium.pharma.model.PlanName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionRequest {
    private PlanName planName;
    private BigDecimal price;
    private int durationInDays;
}
