import mongoose from "mongoose";
import dotenv from "dotenv";
import Appliance from "./models/Appliance.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const appliances = [
  { name: "Refrigerator", power: 200, isActive: false, usageTime: 0 },
  { name: "Air Conditioner", power: 1500, isActive: false, usageTime: 0 },
  { name: "Washing Machine", power: 500, isActive: false, usageTime: 0 },
  { name: "LED Bulb", power: 10, isActive: false, usageTime: 0 },
  { name: "Laptop", power: 65, isActive: false, usageTime: 0 },
  { name: "Television", power: 100, isActive: false, usageTime: 0 },
  { name: "Microwave Oven", power: 1200, isActive: false, usageTime: 0 },
  { name: "Ceiling Fan", power: 75, isActive: false, usageTime: 0 },
  { name: "Water Heater", power: 2000, isActive: false, usageTime: 0 },
  { name: "Dishwasher", power: 1800, isActive: false, usageTime: 0 },
  { name: "Iron", power: 1000, isActive: false, usageTime: 0 },
  { name: "Vacuum Cleaner", power: 1400, isActive: false, usageTime: 0 },
  { name: "Desktop Computer", power: 300, isActive: false, usageTime: 0 },
  { name: "Router", power: 10, isActive: false, usageTime: 0 },
  { name: "Smartphone Charger", power: 5, isActive: false, usageTime: 0 },
  { name: "Printer", power: 60, isActive: false, usageTime: 0 },
  { name: "Coffee Maker", power: 800, isActive: false, usageTime: 0 },
  { name: "Toaster", power: 800, isActive: false, usageTime: 0 },
  { name: "Hair Dryer", power: 1200, isActive: false, usageTime: 0 },
  { name: "Gaming Console", power: 250, isActive: false, usageTime: 0 },
];

const seedData = async () => {
  try {
    await Appliance.deleteMany();
    await Appliance.insertMany(appliances);
    console.log("🌱 20 appliances seeded successfully with usageTime=0!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
