import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const PaymentForm = () => {
    const [expiryDate, setExpiryDate] = useState(null);

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <form className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Full name (as displayed on card)*
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Bonnie Green"
                                        required
                                    />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Card number*
                                    </label>
                                    <input
                                        type="text"
                                        id="card-number-input"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                        pattern="[0-9]{12}"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Card expiration*
                                    </label>


                                    <DatePicker
                                        selected={expiryDate}
                                        onChange={(date) => setExpiryDate(date)}
                                        dateFormat="MM/yy"
                                        showMonthYearPicker
                                        placeholderText="MM/YY"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        required
                                    />

                                </div>

                                <div>
                                    <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        CVV*
                                    </label>
                                    <input
                                        type="number"
                                        id="cvv-input"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="•••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Pay now
                            </button>
                        </form>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">₹6,592.00</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-500">-₹299.00</dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Final Price</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">₹7,191.00</dd>
                                </dl>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-8">
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="paypal" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="visa" />
                                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="mastercard" />
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                        Payment processed by{' '}
                        <a href="" className="pointer-events-none font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">
                            Paddle
                        </a>{' '}
                        for{' '}
                        <a href="" className="pointer-events-none font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">
                            Pharma Premium
                        </a>{' '}
                        - India
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PaymentForm;