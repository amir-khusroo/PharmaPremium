import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData((currData) => ({
            ...currData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/api/user/register`, formData)
          .then((res) => console.log(res.data))
          .catch((err) => console.error("Error:", err));
        setStep(2);
        console.log("Submitted:", formData);
        toast.success("OTP is sended in your email!");

    };
    const handleInput = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        const inputs = document.querySelectorAll("input.otp-input");
        if (value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else if (e.key === "Backspace" && index > 0) {
            inputs[index - 1].focus();
        }
    };

    const submitOtp = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter 6-digit OTP");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/api/user/verify', {
                email: formData.email,
                otp: enteredOtp
            });

            toast.success("OTP Verified Successfully!");
            //console.log("Response:", response.data);
            navigate('/login');

        } catch (error) {
            console.error("OTP Verification Failed:", error);
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                {step === 1 ? (
                    <div className="lg:w-1/2 xl:w-5/12 sm:p-12">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
                            <div className="w-full flex-1 mt-8">
                                <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <select
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleOnChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Sign in as a</option>
                                        <option value="PHARMA_PARTNER">Pharma Partner</option>
                                        <option value="PATIENT">Patient</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-4">Sign Up</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>) : (
                    <div className="lg:w-1/2 xl:w-5/12 sm:p-12">
                        <div className="flex flex-col items-center">
                            <div className="p-8 text-center">
                                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                                    Verify OTP
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                                    Enter the 6-digit code sent to <b>{formData.email}</b>
                                </p>

                                <div className="flex justify-center space-x-4 mb-6">
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            maxLength={1}
                                            onKeyUp={(e) => handleInput(e, idx)}
                                            className="otp-input w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-blue-400 transition-transform duration-300 hover:scale-110"
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={submitOtp}
                                    className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-transform duration-300 hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Verify OTP
                                </button>
                            </div>

                        </div>
                    </div>

                )}
                <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
