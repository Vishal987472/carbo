// src/components/calculator/EnergyUseForm.jsx
import React from "react";

const EnergyUseForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Energy Use</h2>
      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Monthly Electricity (kWh)"
          value={data.electricity || ""}
          onChange={(e) => onChange("electricity", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Monthly Gas (liters)"
          value={data.gas || ""}
          onChange={(e) => onChange("gas", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default EnergyUseForm;
