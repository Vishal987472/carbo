// src/components/calculator/WasteManagementForm.jsx

import React from "react";

const WasteManagementForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Waste Management</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Recyclable Waste (kg per week)</label>
          <input
            type="number"
            name="recyclable"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Non-Recyclable Waste (kg per week)</label>
          <input
            type="number"
            name="nonRecyclable"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Composted Waste (kg per week)</label>
          <input
            type="number"
            name="composted"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default WasteManagementForm;
