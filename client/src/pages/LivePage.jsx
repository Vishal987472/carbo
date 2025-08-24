// src/pages/LivePage.jsx
import React, { useState, useEffect } from "react";
import { FaCloudSun, FaMapMarkerAlt } from "react-icons/fa";
import { WiHumidity, WiThermometer, WiBarometer } from "react-icons/wi";

const LivePage = () => {
  const [city, setCity] = useState("Chandigarh");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawForecast, setRawForecast] = useState(null);

  // Fetch current weather
  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/live/${cityName}`);
      const data = await res.json();

      // Convert sunrise/sunset from forecast (they exist in today's forecast data)
      const todayForecast = data.forecast?.forecastday[0];

      const formatted = {
        location: `${data.location.name}, ${data.location.country}`,
        date: data.location.localtime,
        temp: `${data.current.temp_c}°C`,
        condition: data.current.condition.text,
        feelsLike: `${data.current.feelslike_c}°C`,
        humidity: `${data.current.humidity}%`,
        pressure: `${data.current.pressure_mb} hPa`,
        wind: `${data.current.wind_kph} km/h ${data.current.wind_dir}`,
        visibility: `${data.current.vis_km} km`,

        // 🔹 Newly added fields
        uv: data.current.uv,
        clouds: data.current.cloud,
        sunrise: todayForecast?.astro?.sunrise || "N/A",
        sunset: todayForecast?.astro?.sunset || "N/A",
      };

      setWeatherData(formatted);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch 5-day forecast
  const fetchForecast = async (cityName) => {
    try {
      const res = await fetch(`/api/live/forecast/${cityName}`);
      const data = await res.json();

      // save raw forecast for 24-hour
      setRawForecast(data);

      const formattedForecast = data.forecast.forecastday.map((day, idx) => {
        const date = new Date(day.date);
        const options = { weekday: "short" };
        const label =
          idx === 0 ? "Today" : date.toLocaleDateString("en-US", options);

        return {
          label,
          min: `${day.day.mintemp_c}°`,
          max: `${day.day.maxtemp_c}°`,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          precip: `${day.day.daily_chance_of_rain}% precipitation`,
        };
      });

      setForecastData(formattedForecast);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  // On mount → fetch current + forecast
  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
    fetchForecast(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1623] to-[#0e1d2b] text-white">
      {/* Search Header */}
      <div className="text-center py-3">
        <FaCloudSun className="text-green-400 text-4xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold">
          Live <span className="highlight">Weather</span> Insights
        </h1>
        <p className="text-gray-400 mt-2">
          Get real-time weather data and forecasts for any location around the
          world
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-3 w-80 rounded-lg bg-[#0d1b2a] border border-gray-600 text-white placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      {/* Weather Info */}
      <div className="mx-auto px-8">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {weatherData && (
          <>
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
                <p className="mt-2 font-semibold">
                  Feels Like {weatherData.feelsLike}
                </p>
              </div>
              <div className="bg-[#0d1b2a] p-4 rounded-lg flex flex-col items-center">
                <WiHumidity className="text-4xl text-green-400" />
                <p className="mt-2 font-semibold">
                  Humidity {weatherData.humidity}
                </p>
              </div>
              <div className="bg-[#0d1b2a] p-4 rounded-lg flex flex-col items-center">
                <WiBarometer className="text-4xl text-green-400" />
                <p className="mt-2 font-semibold">
                  Pressure {weatherData.pressure}
                </p>
              </div>
            </div>

            {/* Weather Details & Forecast */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weather Details */}
              <div className="bg-[#1b263b] p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">
                  🌤 Weather Details
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {/* Wind */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">💨</span>
                    <div>
                      <p className="text-sm text-gray-400">Wind</p>
                      <p className="font-medium">{weatherData.wind}</p>
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">👁</span>
                    <div>
                      <p className="text-sm text-gray-400">Visibility</p>
                      <p className="font-medium">{weatherData.visibility}</p>
                    </div>
                  </div>

                  {/* UV Index */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">🌞</span>
                    <div>
                      <p className="text-sm text-gray-400">UV Index</p>
                      <p className="font-medium">{weatherData.uv || "N/A"}</p>
                    </div>
                  </div>

                  {/* Cloudiness */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">☁️</span>
                    <div>
                      <p className="text-sm text-gray-400">Cloudiness</p>
                      <p className="font-medium">{weatherData.clouds}%</p>
                    </div>
                  </div>

                  {/* Sunrise */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">🌅</span>
                    <div>
                      <p className="text-sm text-gray-400">Sunrise</p>
                      <p className="font-medium">{weatherData.sunrise}</p>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="bg-[#0f172a] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-xl">🌇</span>
                    <div>
                      <p className="text-sm text-gray-400">Sunset</p>
                      <p className="font-medium">{weatherData.sunset}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 5-Day Forecast */}
              <div className="bg-[#1b263b] p-6 rounded-xl">
                <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
                <div className="space-y-3">
                  {forecastData.map((day, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-[#0d1b2a] px-4 py-3 rounded-lg"
                    >
                      <p className="font-semibold w-16">{day.label}</p>
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={day.icon}
                          alt={day.condition}
                          className="w-8 h-8"
                        />
                        <div>
                          <p>{day.condition}</p>
                          <p className="text-sm text-gray-400">{day.precip}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        {day.max} / {day.min}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-right text-gray-400 mt-2">{city}</p>
              </div>
            </div>
            {/* 24-Hour Forecast */}
            <div className="bg-[#1b263b] p-6 rounded-xl mt-6 w-full">
              <h2 className="text-lg font-semibold mb-4">24-Hour Forecast</h2>
              <div className="flex overflow-x-auto space-x-6 p-2 scrollbar-hide">
                {rawForecast?.forecast?.forecastday[0]?.hour?.map(
                  (hour, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-[#0f172a] p-3 rounded-lg min-w-[80px] shadow-md"
                    >
                      {/* Time */}
                      <p className="text-sm text-gray-400">
                        {new Date(hour.time).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          hour12: true,
                        })}
                      </p>

                      {/* Weather Icon */}
                      <img
                        src={hour.condition.icon}
                        alt="icon"
                        className="w-8 h-8 my-2"
                      />

                      {/* Temp */}
                      <p className="text-lg font-semibold">{hour.temp_c}°C</p>

                      {/* Condition */}
                      <p className="text-xs text-gray-300 text-center">
                        {hour.condition.text}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LivePage;
