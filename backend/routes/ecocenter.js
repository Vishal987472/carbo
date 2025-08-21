import express from "express";
import Appliance from "../models/Appliance.js";

const router = express.Router();

// Get all appliances
router.get("/", async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.json(appliances);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appliances" });
  }
});

// Add new appliance
router.post("/", async (req, res) => {
  try {
    const newAppliance = new Appliance(req.body);
    await newAppliance.save();
    res.status(201).json(newAppliance);
  } catch (err) {
    res.status(400).json({ error: "Failed to add appliance" });
  }
});

// Toggle appliance
router.patch("/:id/toggle", async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);
    if (!appliance) return res.status(404).json({ error: "Not found" });

    appliance.isActive = !appliance.isActive;
    await appliance.save();
    res.json(appliance);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle appliance" });
  }
});

// Update appliance usage time
router.patch("/:id/time", async (req, res) => {
  try {
    const { usageTime } = req.body;
    const appliance = await Appliance.findById(req.params.id);

    if (!appliance) return res.status(404).json({ error: "Not found" });

    appliance.usageTime = usageTime;
    await appliance.save();
    res.json(appliance);
  } catch (err) {
    res.status(500).json({ error: "Failed to update usage time" });
  }
});

// Delete appliance
router.delete("/:id", async (req, res) => {
  try {
    await Appliance.findByIdAndDelete(req.params.id);
    res.json({ message: "Appliance removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appliance" });
  }
});

export default router;
