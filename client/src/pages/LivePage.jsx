// src/pages/LivePage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Your existing navbar
import { FaCloudSun, FaMapMarkerAlt } from "react-icons/fa";
import { WiHumidity, WiThermometer, WiBarometer } from "react-icons/wi";

const LivePage = () => {
  const [city, setCity] = useState("");

  const weatherData = {
    location: "Bengaluru, IN",
    date: "Saturday, June 14, 2025 at 04:06 PM",
    temp: "27°C",
    condition: "Overcast Clouds",
    feelsLike: "27°C",
    humidity: "77%",
    pressure: "1007 hPa",
    wind: "31 km/h SW",
    visibility: "9.3 km",
    forecast: [
      { day: "Today", condition: "Light Rain", temp: "26° / 21°", precip: "100%" },
      { day: "Sun", condition: "Cloudy", temp: "28° / 22°", precip: "20%" },
      { day: "Mon", condition: "Sunny", temp: "30° / 23°", precip: "0%" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1623] to-[#0e1d2b] text-white">
      {/* Search Header */}
      <div className="text-center py-12">
        <FaCloudSun className="text-green-400 text-4xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold">
          Live <span className="highlight">Weather</span> Insights
        </h1>
        <p className="text-gray-400 mt-2">
          Get real-time weather data and forecasts for any location around the world
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-3 w-80 rounded-lg bg-[#0d1b2a] border border-gray-600 text-white placeholder-gray-400"
          />
          <button className="ml-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Weather Info */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaMapMarkerAlt className="text-green-400" />
          {weatherData.location}
        </div>
        <p className="text-gray-400 mb-4">{weatherData.date}</p>

        {/* Main Weather Card */}
        <div className="bg-[#1b263b] rounded-xl p-6 grid md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-1 flex flex-col justify-center items-center text-center">
            <span className="text-3xl">{weatherData.temp}</span>
            <p className="text-gray-300">{weatherData.condition}</p>
          </div>
          <div className="bg-[#0d1b2a] p-4 rounded-lg flex flex-col items-center">
            <WiThermometer className="text-4xl text-green-400" />
            <p className="mt-2 font-semibold">Feels Like {weatherData.feelsLike}</p>
          </div>
          <div className="bg-[#0d1b2a] p-4 rounded-lg flex flex-col items-center">
            <WiHumidity className="text-4xl text-green-400" />
            <p className="mt-2 font-semibold">Humidity {weatherData.humidity}</p>
          </div>
          <div className="bg-[#0d1b2a] p-4 rounded-lg flex flex-col items-center">
            <WiBarometer className="text-4xl text-green-400" />
            <p className="mt-2 font-semibold">Pressure {weatherData.pressure}</p>
          </div>
        </div>

        {/* Weather Details & Forecast */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1b263b] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Weather Details</h2>
            <p>💨 Wind: {weatherData.wind}</p>
            <p>👁 Visibility: {weatherData.visibility}</p>
          </div>

          <div className="bg-[#1b263b] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
            <div className="space-y-2">
              {weatherData.forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#0d1b2a] p-3 rounded-lg"
                >
                  <span>{day.day}</span>
                  <span>{day.condition}</span>
                  <span>{day.temp}</span>
                  {day.precip && (
                    <span className="text-green-400">{day.precip} precipitation</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
