// src/components/calculator/FoodConsumptionForm.jsx
import React from "react";

const FoodConsumptionForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Food Consumption</h2>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Meat (meals per week)"
          value={data.meat || ""}
          onChange={(e) => onChange("meat", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Dairy (meals per week)"
          value={data.dairy || ""}
          onChange={(e) => onChange("dairy", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default FoodConsumptionForm;
