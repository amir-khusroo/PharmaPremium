import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ setStep }) => {

  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 h-screen flex items-center justify-center">
      <div className="bg-white p-6 md:mx-auto text-center rounded-lg shadow-md max-w-md">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
          Payment Done!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for completing subscription process.
        </p>
        <p>Have a great day!</p>
        <div className="py-10">
          <button
            onClick={() => {setStep(1); navigate("/dashboard")}}
            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md inline-block"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
