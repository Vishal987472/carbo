  // src/pages/HomePage.jsx
  import React from 'react';
  import { Link } from 'react-router-dom';
  import { FaLeaf } from 'react-icons/fa';

  const HomePage = () => {
    return (
      <section id="home" className="home-hero text-white font-sans">
        <div className="home-hero-content px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: Text and Buttons */}
          <div className="home-hero-text">
            <div className="home-tag" aria-label="Site tagline">
              REDUCE - TRACK - IMPROVE
            </div>
            <h1>
              Track Your <span className="highlight">Carbon Footprint</span> in Real-Time
            </h1>
            <p>
              Take control of your environmental impact with our intuitive
              dashboard and personalized insights.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                to="/calculator"
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                aria-label="Start Tracking your carbon footprint"
              >
                Start Tracking →
              </Link>
              <Link
                to="/shop"
                className="border border-gray-500 px-6 py-2 rounded-full hover:border-green-400 transition"
                aria-label="View Shop"
              >
                View Shop
              </Link>
            </div>
          </div>

          {/* Right Section: Dashboard Snippet */}
          <div
            className="bg-[#1e293b] rounded-2xl p-6 shadow-md w-full max-w-md"
            aria-label="Carbon Dashboard Summary"
          >
            <div className="flex items-center justify-between mb-4 text-lg font-semibold">
              <div className="flex items-center space-x-2">
                <FaLeaf className="text-green-400" />
                <span>Carbon Dashboard</span>
              </div>
              <span className="text-sm text-green-400 font-semibold">Today</span>
            </div>

            {/* Footprint Progress */}
            <div className="mb-2 flex justify-between text-sm text-gray-300">
              <span>Your Footprint</span>
              <span className="text-white font-semibold">8.2 kg CO₂</span>
            </div>
            <div className="bg-gray-700 rounded-full h-2 w-full mb-4">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: '41%' }}
              ></div>
            </div>

            {/* Average Progress */}
            <div className="mb-2 flex justify-between text-sm text-gray-300">
              <span>Average</span>
              <span className="text-white font-semibold">12.5 kg CO₂</span>
            </div>
            <div className="bg-gray-700 rounded-full h-2 w-full mb-4">
              <div
                className="h-2 rounded-full"
                style={{ width: '63%', backgroundColor: '#46536a' }}
              ></div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4 text-sm text-white">
              <div className="bg-[#0f172a] rounded-lg p-3">Transport<br /><span className="font-semibold">3.6 kg CO₂</span></div>
              <div className="bg-[#0f172a] rounded-lg p-3">Energy<br /><span className="font-semibold">2.8 kg CO₂</span></div>
              <div className="bg-[#0f172a] rounded-lg p-3">Food<br /><span className="font-semibold">1.5 kg CO₂</span></div>
              <div className="bg-[#0f172a] rounded-lg p-3">Other<br /><span className="font-semibold">0.3 kg CO₂</span></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default HomePage;
