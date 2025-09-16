import express from "express";
import CarbonEntry from "../models/CarbonEntry.js";
import { calculateCarbonFootprint } from "../utils/calculationService.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// save weekly inputs (update if same week/year exists)
router.post("/add", protect, async (req, res) => {
  try {
    const { week, year, inputs } = req.body;
    const userId = req.user.id;

    const calc = calculateCarbonFootprint(inputs);

    // round equivalents
    const equivalents = {
      kmDriven: Math.round(calc.equivalents.kmDriven),
      trees: Math.round(calc.equivalents.trees),
    };

    // update if already exists, otherwise insert
    const entry = await CarbonEntry.findOneAndUpdate(
      { userId, week, year },
      {
        userId,
        week,
        year,
        inputs,
        total: calc.total,
        breakdown: calc.breakdown, // ✅ save breakdown
        equivalents: {
          kmDriven: Math.round(calc.equivalents.kmDriven),
          trees: Math.round(calc.equivalents.trees),
        },
        suggestion: calc.suggestion,
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      entry,
      equivalents,
      breakdown: calc.breakdown,
      suggestion: calc.suggestion || "Try reducing waste and energy use.",
    });
  } catch (err) {
    console.error("❌ Error saving entry:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// fetch total annual emissions
router.get("/annual/:userId/:year", protect, async (req, res) => {
  try {
    const { year, userId } = req.params;

    const entries = await CarbonEntry.find({ userId, year });

    if (!entries.length) {
      return res.status(404).json({ message: "No data found for this year" });
    }

    // Sum up values
    const annualTotal = entries.reduce((sum, e) => sum + (e.total || 0), 0);
    const annualKm = entries.reduce(
      (sum, e) => sum + (e.equivalents?.kmDriven || 0),
      0
    );
    const annualTrees = entries.reduce(
      (sum, e) => sum + (e.equivalents?.trees || 0),
      0
    );
    const annualGallons = entries.reduce(
      (sum, e) => sum + (e.equivalents?.gallons || 0),
      0
    );

    // ✅ Aggregate category breakdown
    const annualBreakdown = entries.reduce((acc, e) => {
      Object.keys(e.breakdown || {}).forEach((key) => {
        acc[key] = (acc[key] || 0) + (e.breakdown[key] || 0);
      });
      return acc;
    }, {});

    res.json({
      annualTotal: Number(annualTotal.toFixed(2)),
      annualKm: Number(annualKm.toFixed(2)),
      annualTrees: Math.round(annualTrees),
      annualGallons: Number(annualGallons.toFixed(2)),
      breakdown: annualBreakdown, // ✅ yearly category totals
      weeks: entries, // ✅ all weekly docs for charts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// fetch latest weekly entry
router.get("/latest", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const latest = await CarbonEntry.findOne({ userId }).sort({
      year: -1,
      week: -1,
    });

    if (!latest) return res.status(404).json({ message: "No data found" });

    // Recalculate equivalents + breakdown for consistency
    const calc = calculateCarbonFootprint(latest.inputs);
    const equivalents = {
      kmDriven: Math.round(calc.equivalents.kmDriven),
      trees: Math.round(calc.equivalents.trees),
    };

    res.json({
      success: true,
      entry: latest,
      equivalents,
      breakdown: calc.breakdown,
      suggestion: calc.suggestion || "Try reducing waste and energy use.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
