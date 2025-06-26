import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            //await axios.post("/api/auth/forgot-password", { email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (err) {
            console.error("Error sending OTP:", err);
            toast.error("Failed to send OTP. Please try again.");
        }
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

    const handleVerifyOtp = async (e) => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter 6-digit OTP");
            return;
        }
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:8081/user/verify-otp', {
            //     email: formData.email,
            //     otp: enteredOtp
            // });
            toast.success("OTP Verified Successfully!");
            //console.log("Response:", response.data);
            setStep(3);

        } catch (error) {
            console.error("OTP Verification Failed:", error);
            toast.error("Invalid OTP. Please try again.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords do not match!");
            setNewPassword("");
            setConfirmNewPassword("");
            return;
        }
        try {
            //const response= await axios.post("/api/auth/reset-password", { email, newPassword });
            toast.success("Password reset successfully!");
            setStep(1);
            setEmail("");
            setOtp(["", "", "", "", "", ""]);
            setNewPassword("");
            setConfirmNewPassword("");
            navigate("/login");
        } catch (err) {
            toast.error("Failed to reset password.");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 sm:p-12">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Forgot Password
                        </h1>
                        <div className="w-full flex-1 mt-8">

                            {step === 1 && (<form className="mx-auto max-w-xs" onSubmit={handleSendOtp}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name='email'
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit">
                                        <span className="ml-3">
                                            Send OTP
                                        </span>
                                    </button>
                                </form>)}

                                {step === 2 && (<div className="mx-auto max-w-xs">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
                                        OTP sent to <b>{email}</b>
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
                                        onClick={handleVerifyOtp}
                                        className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-transform duration-300 hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Verify OTP
                                    </button>
                                </div>)}

                                {step === 3 && (<form className="mx-auto max-w-xs" onSubmit={handleResetPassword}>
                                    
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name='password'
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name='confirmPassword'
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit">
                                        <span className="ml-3">
                                            Reset Password
                                        </span>
                                    </button>
                                </form>)}

                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
