// models/Appliance.js
import mongoose from "mongoose";

const applianceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    power: {
      type: Number, // in watts
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    usageTime: {
      type: Number, // in minutes
      default: 0,
    },
  },
  { timestamps: true }
);

const Appliance = mongoose.model("Appliance", applianceSchema);

export default Appliance;
