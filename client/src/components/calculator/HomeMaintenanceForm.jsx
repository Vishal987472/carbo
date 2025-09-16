// src/components/calculator/HomeMaintenanceForm.jsx
import React from "react";

const HomeMaintenanceForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">Home & Building Maintenance</h3>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Heating System Age (years)"
          value={data.heatingAge || ""}
          onChange={(e) => onChange("heatingAge", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Insulation Quality (1–10)"
          value={data.insulation || ""}
          onChange={(e) => onChange("insulation", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default HomeMaintenanceForm;
