import mongoose from "mongoose";

const carbonEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },

  inputs: {
    transportation: Object,
    energy: Object,
    food: Object,
    waste: Object,
    water: Object,
    social: Object,
    shopping: Object,
    home: Object,
  },

  total: { type: Number, required: true },

  breakdown: { type: Object, required: true },

  equivalents: {
    kmDriven: { type: Number, default: 0 },
    trees: { type: Number, default: 0 },
    gallons: { type: Number, default: 0 },
  },

  suggestion: { type: String, default: "" },
});

export default mongoose.model("CarbonEntry", carbonEntrySchema);
