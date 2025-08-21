// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar"; // your existing navbar

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#0b1623] text-white font-sans">

      {/* Header */}
      <div className="text-center py-8">
      <div className="calculator-header">
        <div className="tag">YOUR CARBON DASHBOARD</div>
      </div>
        <h1 className="text-3xl font-bold mt-2">
          Welcome, <span className="text-green-400">FENNY MARY SAJU</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Tracking your environmental impact since December 18, 2024
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 border-b border-gray-700">
        {["overview", "charts", "comparison"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize px-4 ${
              activeTab === tab
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Carbon Status */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📊 Carbon Status
              </h2>
              <div className="h-64 flex items-center justify-center text-yellow-400 text-xl">
                [Gauge Chart Placeholder — 404.0 kg CO₂, Medium Impact]
              </div>
            </div>

            {/* Carbon Trends */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📈 Carbon Trends
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                [Line Chart Placeholder]
              </div>
            </div>
          </div>
        )}

        {activeTab === "charts" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Impact by Category */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🥧 Impact by Category
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                [Pie Chart Placeholder]
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📊 Category Breakdown
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                [Radar Chart Placeholder]
              </div>
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* National Comparison */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                ⚖ National Comparison
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                [Bar Chart Placeholder]
              </div>
            </div>

            {/* Environmental Equivalencies */}
            <div className="bg-[#132032] p-6 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🌱 Environmental Equivalencies
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b border-gray-700 pb-2">
                  <span>Smartphones Charged</span>
                  <span className="text-green-400">80792</span>
                </li>
                <li className="flex justify-between border-b border-gray-700 pb-2">
                  <span>Distance Driven</span>
                  <span className="text-green-400">1000</span>
                </li>
                <li className="flex justify-between border-b border-gray-700 pb-2">
                  <span>Trees Needed (1 Year)</span>
                  <span className="text-green-400">19</span>
                </li>
                <li className="flex justify-between">
                  <span>Gallons of Gasoline</span>
                  <span className="text-green-400">45</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
