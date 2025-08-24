// TransportationForm.jsx
import React from "react";

const TransportationForm = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Transportation</h2>
      <form className="grid gap-4">
        <input
          type="number"
          placeholder="Kilometers driven per week"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="number"
          placeholder="Fuel efficiency (km/l)"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
      </form>
    </div>
  );
};

export default TransportationForm;
