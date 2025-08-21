// src/pages/EcoCenterPage.jsx
import React, { useState, useEffect } from "react";

export default function EcoCenterPage() {
  const [appliances, setAppliances] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch appliances
  useEffect(() => {
    fetch("/api/ecocenter")
      .then((res) => res.json())
      .then((data) => setAppliances(data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle appliance
  const toggleAppliance = async (id) => {
    try {
      const res = await fetch(`/api/ecocenter/${id}/toggle`, { method: "PATCH" });
      const updated = await res.json();
      setAppliances((prev) =>
        prev.map((app) => (app._id === id ? updated : app))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Update duration
  const updateDuration = async (id, hours, minutes) => {
    try {
      const usageTime = hours * 60 + minutes;
      const res = await fetch(`/api/ecocenter/${id}/time`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usageTime }),
      });
      const updated = await res.json();
      setAppliances((prev) =>
        prev.map((app) => (app._id === id ? updated : app))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Delete appliance
  const deleteAppliance = async (id) => {
    try {
      await fetch(`/api/ecocenter/${id}`, { method: "DELETE" });
      setAppliances((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // CO2 calculation function
  const calculateCO2 = (app) => {
    const kWh = (app.power / 1000) * (app.usageTime / 60); // convert watts to kW and minutes to hours
    const co2 = kWh * 0.475; // 0.475 kg CO2 per kWh
    return co2.toFixed(2);
  };

  const totalCO2 = appliances.reduce((acc, app) => {
    if (app.isActive) return acc + parseFloat(calculateCO2(app));
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      {/* Header */}
      <div className="calculator-header mb-6">
        <div className="tag">
          <i className="fas fa-plug mr-2"></i>ENERGY - TRACKING
        </div>
        <h2>
          Your <span className="highlight">Eco Center</span> Dashboard
        </h2>
        <p>Track your energy usage to reduce your carbon footprint.</p>
      </div>

      {/* Current Energy Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1e293b] rounded-xl p-6 shadow">
          <p className="text-gray-400">Current Energy Impact</p>
          <h2 className="text-2xl font-bold text-green-400">
            {totalCO2.toFixed(2)} kg CO₂
          </h2>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                totalCO2 > 6.8 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min((totalCO2 / 6.8) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1">
            6.8 kg limit{" "}
            {totalCO2 > 6.8 && <span className="text-red-400">(Over limit!)</span>}
          </p>
        </div>

        {/* Active Appliances */}
        <div className="bg-[#1e293b] rounded-xl p-6 shadow">
          <p className="text-gray-400">Active Appliances:</p>
          {appliances.filter((app) => app.isActive).length === 0 ? (
            <p className="text-gray-500 mt-2">No active appliances</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {appliances
                .filter((app) => app.isActive)
                .map((app) => {
                  const hours = Math.floor((app.usageTime || 0) / 60);
                  const minutes = (app.usageTime || 0) % 60;
                  return (
                    <li
                      key={app._id}
                      className="flex justify-between text-sm border-b border-gray-700 pb-1"
                    >
                      <span>
                        {app.name} ({hours}h {minutes}m)
                      </span>
                      <span className="text-green-400">{calculateCO2(app)} kg CO₂</span>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#1e293b] rounded-xl p-3 mb-6">
        <i className="fas fa-search text-gray-400 mr-3"></i>
        <input
          type="text"
          placeholder="Search appliances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none w-full text-white"
        />
      </div>

      {/* Appliance List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {appliances
          .filter((app) => app.name.toLowerCase().includes(search.toLowerCase()))
          .map((app) => {
            const hours = Math.floor((app.usageTime || 0) / 60);
            const minutes = (app.usageTime || 0) % 60;

            return (
              <div
                key={app._id}
                className="bg-[#1e293b] rounded-xl p-6 shadow space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{app.name}</h3>
                  <span
                    className={`text-sm ${app.isActive ? "text-green-400" : "text-red-400"}`}
                  >
                    {app.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex space-x-2">
                  <select
                    value={hours}
                    onChange={(e) => updateDuration(app._id, Number(e.target.value), minutes)}
                    className="bg-gray-700 p-2 rounded-lg"
                  >
                    {Array.from({ length: 25 }, (_, i) => (
                      <option key={i} value={i}>{i} hrs</option>
                    ))}
                  </select>
                  <select
                    value={minutes}
                    onChange={(e) => updateDuration(app._id, hours, Number(e.target.value))}
                    className="bg-gray-700 p-2 rounded-lg"
                  >
                    {[0, 15, 30, 45].map((m) => (
                      <option key={m} value={m}>{m} mins</option>
                    ))}
                  </select>
                </div>

                {/* Toggle */}
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => toggleAppliance(app._id)}
                    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                      app.isActive ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
                        app.isActive ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                  <span>Status</span>
                </div>

                <p className="text-gray-400 text-sm">
                  Carbon Footprint: <span className="text-green-400">{calculateCO2(app)} kg CO₂</span>
                </p>

                <button
                  onClick={() => deleteAppliance(app._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
