// src/components/calculator/SocialActivitiesForm.jsx
import React from "react";

const SocialActivitiesForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">Social Activities</h3>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Events Attended (per month)"
          value={data.events || ""}
          onChange={(e) => onChange("events", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />

        <input
          type="number"
          placeholder="Trips Taken (per year)"
          value={data.trips || ""}
          onChange={(e) => onChange("trips", e.target.value)}
          className="border p-2 rounded w-full bg-gray-900 text-white"
        />
      </div>
    </div>
  );
};

export default SocialActivitiesForm;
