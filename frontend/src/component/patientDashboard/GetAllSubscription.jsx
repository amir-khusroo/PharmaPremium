import { Card, Typography, Button } from "@material-tailwind/react";
import { use } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const GetAllSubscription = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const backgroundColor = {
        "SILVER": "bg-[#fcf4ff]",
        "GOLD": "bg-[#fefaf0]",
        "DIAMOND": "bg-[#f3faff]"
    };
    useEffect(() => {
        axios.get(`${API_URL}/api/subscription/getAll`)
            .then((response) => {
                setPlans(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subscription plans:", error);
                toast.error("Failed to fetch subscription plans.");
            });
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
            <div className="flex flex-wrap justify-center items-stretch gap-6">
                {plans.map((plan, index) => (
                    <div key={index} className={`w-full sm:w-96 rounded-2xl shadow-lg p-6 bg-[#fefaf0] border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out ${backgroundColor[plan.planName]}`}
>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.planName}</h2>

                        <ul className="text-gray-600 text-sm space-y-2 mb-4">
                            <li>
                                <span className="font-medium">💰 Price:</span> ₹{Number(plan.price).toLocaleString("en-IN")}
                            </li>
                            <li>
                                <span className="font-medium">🎁 Discount:</span> {plan.discountPrecentage}%
                            </li>
                            <li>
                                <span className="font-medium">⏳ Duration:</span> {plan.durationInDays} days
                            </li>
                        </ul>

                        <button onClick={() => navigate("/payment", { state: { plan } })} className="w-full bg-gradient-to-tl from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 rounded-md transition">
                            Pay Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default GetAllSubscription;
