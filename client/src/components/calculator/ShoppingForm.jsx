// src/components/calculator/ShoppingForm.jsx
import React from "react";

const ShoppingForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">Shopping & Online Purchases</h3>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Clothes Bought (per month)"
          value={data.clothes || ""}
          onChange={(e) => onChange("clothes", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Electronics Bought (per year)"
          value={data.electronics || ""}
          onChange={(e) => onChange("electronics", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default ShoppingForm;
