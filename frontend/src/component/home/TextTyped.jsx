import React from 'react';
import {ReactTyped} from 'react-typed';
const TextTyped = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-black bg-opacity-40 p-4 rounded-lg">
                <ReactTyped
                    className="text-3xl text-white font-bold"
                    strings={[
                        "Welcome to Pharma Premium",
                        "Affordable Health Plans",
                        "Buy Medicines with Discounts",
                        "Stay Healthy, Stay Happy"
                    ]}
                    typeSpeed={100}
                    backSpeed={50}
                    loop={true}
                />
            </div>
        </div>
    );
}
export default TextTyped;