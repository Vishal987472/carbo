import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  destination: { type: String, required: true },
  carModel: { type: String, required: true },
  distance: { type: Number, required: true },
  pickupPoint: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ride", rideSchema);
