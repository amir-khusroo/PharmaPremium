import React, { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import PaymentSuccess from "./PaymentSuccess";
import { useLocation } from "react-router-dom";

const Payment = () => {
    const [step, setStep] = useState(1);
    const location = useLocation();
    const { plan } = location.state || {};
    if (!plan) return <div>No plan selected.</div>;

    return (
        <>
            {step === 1 && (<PaymentForm setStep={setStep} plan={plan} />)}
            {step === 2 && (<PaymentSuccess setStep={setStep} />)}
        </>
    );
};

export default Payment;