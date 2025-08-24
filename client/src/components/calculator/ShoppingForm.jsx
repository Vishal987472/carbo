// src/components/calculator/ShoppingOnlineForm.jsx

import React from "react";

const ShoppingOnlineForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Shopping & Online Purchases</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Clothing items bought per month</label>
          <input
            type="number"
            name="clothingItems"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Electronics purchased per month</label>
          <input
            type="number"
            name="electronics"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Online orders placed per month</label>
          <input
            type="number"
            name="onlineOrders"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default ShoppingOnlineForm;
