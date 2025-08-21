// src/components/calculator/FoodConsumptionForm.jsx

import React from "react";

const FoodConsumptionForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Food Consumption</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Meat & Dairy (meals per week)</label>
          <input
            type="number"
            name="meatDairy"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Plant-Based Meals (meals per week)</label>
          <input
            type="number"
            name="plantBased"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Food Waste (kg per week)</label>
          <input
            type="number"
            name="foodWaste"
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

export default FoodConsumptionForm;
