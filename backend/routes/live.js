import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Current Weather + Sunrise/Sunset
router.get("/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Weather API key not configured" });
  }

  try {
    // Use forecast.json with days=1
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
        city
      )}&days=1&aqi=yes&alerts=no`
    );

    res.json(response.data);
  } catch (err) {
    console.error("Weather API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// 5-Day Forecast
router.get("/forecast/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Weather API key not configured" });
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
        city
      )}&days=5&aqi=no&alerts=no`
    );

    res.json(response.data);
  } catch (err) {
    console.error("Weather API Forecast Error:", err.message);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default router;
