import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const PurchaseMedicine = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [patient, setPatient] = useState(null);
    const [hasSubscription, setHasSubscription] = useState(false);
    const [items, setItems] = useState([{ name: '', price: '', quantity: '' }]);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + price * quantity;
        }, 0);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        axios.get(`${API_URL}/api/user/${email}`)
            .then((res) => {
                setPatient(res.data);
                console.log("Patient data:", res.data);
                setStep(2);
            })
            .catch((error) => {
                console.error("Error checking subscription:", error);
                toast.error("Not a valid user.");
            });
    };

    const addRow = () => {
        setItems([...items, { name: '', price: '', quantity: '' }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleSendOtp = async () => {
        axios.post(`${API_URL}/api/medicine/purchase/request-otp`, {}, {
            params: { email },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setOtpSent(true);
                toast.success("OTP sent to email");
                console.log('OTP sent to:', email);
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                toast.error("Failed to send OTP.");
                setStep(1);
            });
    };

    const handleFinalSubmit = async (e) => {
        const data = {
            patientEmail: email,
            otp: otp,
            items: items,
        };
        e.preventDefault();
        axios.post(`${API_URL}/api/medicine/purchase/confirm`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                toast.success("Purchased successfully!");
                setEmail('');
                setItems([{ name: '', price: '', quantity: '' }]);
                setStep(3);
                setOtp('');
                setOtpSent(false);

            })

            .catch((error) => {
                toast.error("Failed to verify OTP. Please try again.");
            });


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 to-purple-50 p-4">
            <Card className="w-full max-w-3xl shadow-xl p-6 rounded-2xl">
                <CardBody className="space-y-8">
                    <Typography variant="h4" color="blue-gray" className="text-center font-bold">
                        Purchase Medicine
                    </Typography>

                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit} className="space-y-2">
                            <Typography variant="h6">Enter Patient Email</Typography>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required

                            />
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className="w-fit px-6 py-2 text-sm"
                                    color="blue"
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleFinalSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <div>
                                    <div>Patient Name : {patient?.name}</div>
                                    {patient?.subscription ? (
                                        <Typography
                                            variant="small"
                                            color="green"
                                            className="font-medium"
                                        >
                                            🎉 Patient have an active {patient.subscription.subscriptionType.planName} subscription. A {patient.subscription.subscriptionType.discountPrecentage} % discount will be applied!
                                        </Typography>) : (
                                        <Typography
                                            variant="small"
                                            className="font-medium text-red-500"
                                        >
                                            Patient have not active subscription
                                        </Typography>
                                    )}
                                </div>
                                <Typography variant="h6">Medicine List</Typography>
                                {items.map((item, index) => (
                                    <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className='absolute left-2 top-2'>{index + 1}.</span>
                                        <input
                                            placeholder="Medicine Name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                            className="ml-10 rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            placeholder="Price"
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, "price", e.target.value)}
                                            className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            placeholder="Quantity"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                            className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <Button variant="outlined" onClick={addRow}>
                                        + Add Medicine
                                    </Button>
                                </div>
                                <Typography variant="h6">Total Price: {calculateTotalPrice()} </Typography>
                                <Typography variant="h6">Discounted Price: {calculateTotalPrice() - (calculateTotalPrice() * (patient?.subscription?.subscriptionType?.discountPrecentage || 0) / 100)} </Typography>
                            </div>

                            {!otpSent ? (
                                <Button fullWidth color="indigo" onClick={handleSendOtp}>
                                    Send OTP to Email
                                </Button>
                            ) : (
                                <div className="flex flex-col items-center space-y-4">
                                    <input
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                        required
                                    />
                                    <Button type='submit' className='bg-green-500 hover:bg-green-600' color="green">
                                        Submit Order
                                    </Button>
                                </div>
                            )}

                        </form>
                    )}

                    {step === 3 && (
                            <div className="bg-white p-6 md:mx-auto text-center rounded-lg max-w-md">
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
                                    Purchase Successful!
                                </h3>
                                <p className="text-gray-600 my-2">
                                    Thank you for completing the purchase process.
                                </p>
                                <p>Have a great day!</p>
                                <div className="py-10">
                                    <button
                                        onClick={() => { setStep(1); navigate("/dashboard") }}
                                        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md inline-block"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default PurchaseMedicine;
