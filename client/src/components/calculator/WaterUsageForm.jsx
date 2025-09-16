// src/components/calculator/WaterUsageForm.jsx
import React from "react";

const WaterUsageForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">Water Usage</h3>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Daily Showers (minutes)"
          value={data.showers || ""}
          onChange={(e) => onChange("showers", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Laundry Loads (per week)"
          value={data.laundry || ""}
          onChange={(e) => onChange("laundry", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default WaterUsageForm;
