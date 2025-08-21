// src/components/calculator/BuildingMaintenanceForm.jsx

import React from "react";

const BuildingMaintenanceForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Building & Home Maintenance</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Renovation frequency (times/year)</label>
          <input
            type="number"
            name="renovationFrequency"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Paint used (liters/year)</label>
          <input
            type="number"
            name="paintUsed"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Construction waste (kg/year)</label>
          <input
            type="number"
            name="constructionWaste"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default BuildingMaintenanceForm;
