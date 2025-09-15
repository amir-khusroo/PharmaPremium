import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // icons

const PurchaseHistory = ({ items }) => {
  // track expanded state per card by id
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-gray-50 rounded-xl shadow-sm border hover:shadow-md transition mb-3"
        >
          {/* Header with toggle */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleCard(item.id)}
          >
            <h4 className="font-semibold text-gray-800">
              Patient: {item.patient?.name || "Unknown"}
            </h4>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}{" "}
                {new Date(item.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(item.id);
                }}
              >
                {expandedCard === item.id ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Expandable Section */}
          {expandedCard === item.id && (
            <>
              <ul className="text-sm text-gray-700 space-y-1 mb-2 mt-3">
                {item.items?.map((med) => (
                  <li key={med.id} className="flex justify-between">
                    <span>
                      {med.name} (x{med.quantity})
                    </span>
                    <span>₹{med.price}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-3 border-t pt-2">
                <span className="text-sm text-gray-500">
                  Discount:{" "}
                  <span className="text-green-600 font-medium">
                    ₹{item.discount.toFixed(2)}
                  </span>
                </span>
                <span className="text-lg font-bold text-blue-700">
                  ₹{item.finalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default PurchaseHistory;
