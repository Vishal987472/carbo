import express from "express";
import Ride from "../models/Ride.js";

const router = express.Router();

// GET all rides
router.get("/", async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});

// POST create ride
router.post("/", async (req, res) => {
  try {
    const newRide = new Ride(req.body);
    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ error: "Failed to create ride" });
  }
});

// PATCH book a ride
router.patch("/:id/book", async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }

    ride.seatsAvailable -= 1;
    await ride.save();

    res.json({ message: "Ride booked successfully", ride });
  } catch (err) {
    res.status(500).json({ error: "Failed to book ride" });
  }
});

export default router;
