// src/components/calculator/WaterUsageForm.jsx

import React from "react";

const WaterUsageForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Water Usage</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Daily Water Usage (liters)</label>
          <input
            type="number"
            name="dailyWaterUsage"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Baths per week</label>
          <input
            type="number"
            name="bathsPerWeek"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Laundry Loads per week</label>
          <input
            type="number"
            name="laundryLoads"
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

export default WaterUsageForm;
