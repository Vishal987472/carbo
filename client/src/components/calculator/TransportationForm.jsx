// TransportationForm.jsx
import React from "react";

const TransportationForm = ({ data, onChange }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Transportation</h2>
      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Kilometers driven per week"
          value={data.km || ""}
          onChange={(e) => onChange("km", e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="number"
          placeholder="Fuel efficiency (km/l)"
          value={data.fuelEfficiency || ""}
          onChange={(e) => onChange("fuelEfficiency", e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
      </div>
    </div>
  );
};


export default TransportationForm;
