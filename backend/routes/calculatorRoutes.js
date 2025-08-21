import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { transportation, energy, food } = req.body;
    const apiKey = process.env.CARBON_INTERFACE_API_KEY;
    const baseUrl = "https://www.carboninterface.com/api/v1";
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    let breakdown = {};
    let total = 0;

    // 1️⃣ Transportation
    if (transportation) {
      const response = await axios.post(
        `${baseUrl}/estimates`,
        {
          type: "vehicle",
          distance_unit: transportation.unit, // "km" or "mi"
          distance_value: transportation.distance,
          vehicle_model_id: transportation.vehicle_model_id, // from Carbon Interface docs
        },
        { headers }
      );
      breakdown.transportation = response.data.data.attributes.carbon_kg;
      total += breakdown.transportation;
    }

    // 2️⃣ Energy
    if (energy) {
      const response = await axios.post(
        `${baseUrl}/estimates`,
        {
          type: "electricity",
          electricity_unit: "kwh",
          electricity_value: energy.electricity_kwh,
          country: "IN", // India, change as needed
          state: "KA", // Karnataka (optional)
        },
        { headers }
      );
      breakdown.energy = response.data.data.attributes.carbon_kg;
      total += breakdown.energy;
    }

    // 3️⃣ Food
    if (food) {
      const response = await axios.post(
        `${baseUrl}/estimates`,
        {
          type: "diet",
          diet_type: food.type, // "omnivore", "vegetarian", etc.
        },
        { headers }
      );
      breakdown.food = response.data.data.attributes.carbon_kg;
      total += breakdown.food;
    }

    res.json({
      total_kg: total,
      breakdown,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to calculate carbon footprint" });
  }
});

export default router;
