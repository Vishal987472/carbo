import express from "express";
import { calculateCarbonFootprint } from "../utils/calculationService.js";

const router = express.Router();

router.post("/calculate", (req, res) => {
  try {
    const formData = req.body;
    const result = calculateCarbonFootprint(formData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Calculation failed" });
  }
});

export default router;
