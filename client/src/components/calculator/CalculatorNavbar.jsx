// src/components/calculator/CalculatorNavbar.jsx
import React from "react";

const sections = [
  "Transportation",
  "Energy Use",
  "Food Consumption",
  "Waste Management",
  "Water Usage",
  "Social Activities",
  "Shopping",
  "Home Maintenance"
];

const CalculatorNavbar = ({ currentSection, onSectionChange }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-gray-900">
      <div className="flex whitespace-nowrap space-x-3 p-3">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm flex-shrink-0 ${
              currentSection === section
                ? "bg-green-500 text-black font-semibold"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorNavbar;
