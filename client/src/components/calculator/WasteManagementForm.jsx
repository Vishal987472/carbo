// src/components/calculator/WasteManagementForm.jsx
import React from "react";

const WasteManagementForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Waste Management</h2>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Recycling (% of waste)"
          value={data.recycling || ""}
          onChange={(e) => onChange("recycling", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Composting (% of food waste)"
          value={data.composting || ""}
          onChange={(e) => onChange("composting", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default WasteManagementForm;
