function calculateCarbonFootprint(data) {
  let total = 0;
  const breakdown = {};

  const transportation = data.transportation || {};
  const energy = data.energy || {};
  const food = data.food || {};
  const waste = data.waste || {};
  const water = data.water || {};
  const social = data.social || {};
  const shopping = data.shopping || {};
  const home = data.home || {};

  // 🚗 Transportation
  if (transportation.km && transportation.fuelEfficiency) {
    // liters used × 2.3 kg CO₂ per liter
    breakdown.transportation =
      (transportation.km / transportation.fuelEfficiency) * 2.3;
  } else {
    breakdown.transportation = 0;
  }
  total += breakdown.transportation;

  // ⚡ Energy
  const { electricity = 0, gas = 0 } = energy;
  breakdown.energy = electricity * 0.92 + gas * 2.3; // 2.3 kg CO₂ per liter gas approx.
  total += breakdown.energy;

  // 🥗 Food
  const { meat = 0, dairy = 0 } = food;
  breakdown.food = meat * 5 + dairy * 3; // kg CO₂ per meal (approx)
  total += breakdown.food;

  // 🗑 Waste
const recycling = parseFloat(waste.recycling) || null;
const composting = parseFloat(waste.composting) || null;

if (recycling !== null || composting !== null) {
  const baselineWaste = 100;
  const unrecycled = baselineWaste * (1 - (recycling || 0) / 100);
  const uncomposted = baselineWaste * (1 - (composting || 0) / 100);
  breakdown.waste = unrecycled * 0.05 + uncomposted * 0.02;
} else {
  breakdown.waste = 0;
}


  // 💧 Water
  const { showers = 0, laundry = 0 } = water;
  breakdown.water =
    showers * 2 + // 2 kg CO₂ per 10 min shower (heating water)
    laundry * 1.5; // 1.5 kg CO₂ per load
  total += breakdown.water;

  // 🎉 Social
  const { events = 0, trips = 0 } = social;
  breakdown.social =
    events * 20 + // 20 kg CO₂ per event (travel/energy use)
    trips * 150; // average short trip per year
  total += breakdown.social;

  // 🛍 Shopping
  const { clothes = 0, electronics = 0 } = shopping;
  breakdown.shopping =
    clothes * 25 + // clothes have medium footprint
    electronics * 200; // electronics high footprint
  total += breakdown.shopping;

  // 🏠 Home
  const { heatingAge = 0, insulation = 0 } = home;
  // Older heating system = higher emissions, better insulation = lower emissions
  breakdown.home =
    heatingAge * 10 - insulation * 2; // crude estimation
  if (breakdown.home < 0) breakdown.home = 0; // no negatives
  total += breakdown.home;

  // 🌍 Equivalents
const equivalents = {
  kmDriven: breakdown.transportation / 0.21 || 0,
  trees: total / 21,
  gallons: total / 8.9,
};


  return {
    total: Number(total.toFixed(2)),
    breakdown,
    equivalents,
    suggestion: "Try reducing driving, improving insulation, and choosing sustainable food options.",
  };
}

export { calculateCarbonFootprint };
