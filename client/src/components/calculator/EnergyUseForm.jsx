// src/components/calculator/EnergyUseForm.jsx

import React from "react";

const EnergyUseForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Energy Use</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Electricity Usage (kWh per month)</label>
          <input
            type="number"
            name="electricity"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Natural Gas Usage (therms per month)</label>
          <input
            type="number"
            name="naturalGas"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Heating Oil Usage (gallons per month)</label>
          <input
            type="number"
            name="heatingOil"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EnergyUseForm;
