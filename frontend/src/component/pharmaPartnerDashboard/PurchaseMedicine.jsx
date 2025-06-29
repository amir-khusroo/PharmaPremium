import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

const PurchaseMedicine = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [hasSubscription, setHasSubscription] = useState(false);
    const [items, setItems] = useState([{ name: '', price: '', quantity: '' }]);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [serverOtp, setServerOtp] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        // Simulate subscription check
        // const res = await axios.post('/api/check-subscription', { email });
        // setHasSubscription(res.data.hasSubscription);
        setStep(2);
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
        // Simulate OTP send
        // const { data } = await axios.post('/api/send-otp', { email });
        // setServerOtp(data.otp);
        setOtpSent(true);
        console.log('OTP sent to:', email);
    };

    const handleFinalSubmit = async () => {
        // Simulate OTP validation
        // if (otp !== serverOtp) {
        //     alert('Invalid OTP');
        //     return;
        // }

        const finalItems = items.map((item) => ({
            ...item,
            price: hasSubscription ? item.price * 0.9 : item.price,
        }));

        // await axios.post('/api/submit-order', { email, otp, items: finalItems });

        alert('✅ Order submitted!');
        setEmail('');
        setItems([{ name: '', price: '', quantity: '' }]);
        setStep(1);
        setOtp('');
        setOtpSent(false);
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
                                <Typography variant="h6">Medicine List</Typography>
                                {items.map((item, index) => (
                                    <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className='absolute left-2 top-2'>{index + 1}.</span>
                                        <input
                                            placeholder="Name"
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

                            {hasSubscription && (
                                <Typography
                                    variant="small"
                                    color="green"
                                    className="font-medium text-center"
                                >
                                    🎉 You have an active subscription. A 10% discount will be applied!
                                </Typography>
                            )}
                        </form>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default PurchaseMedicine;
