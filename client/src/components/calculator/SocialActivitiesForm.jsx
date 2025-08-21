// src/components/calculator/SocialActivitiesForm.jsx

import React from "react";

const SocialActivitiesForm = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Social Activities</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Events attended per month</label>
          <input
            type="number"
            name="eventsPerMonth"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Average distance traveled for events (km)</label>
          <input
            type="number"
            name="eventDistance"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Meals eaten out per month</label>
          <input
            type="number"
            name="mealsOut"
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

export default SocialActivitiesForm;
