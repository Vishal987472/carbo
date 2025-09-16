// src/pages/CalculatorPage.jsx
import React, { useState } from "react";
import axios from "axios";
import CalculatorNavbar from "../components/calculator/CalculatorNavbar";
import TransportationForm from "../components/calculator/TransportationForm";
import EnergyUseForm from "../components/calculator/EnergyUseForm";
import FoodConsumptionForm from "../components/calculator/FoodConsumptionForm";
import WasteManagementForm from "../components/calculator/WasteManagementForm";
import WaterUsageForm from "../components/calculator/WaterUsageForm";
import SocialActivitiesForm from "../components/calculator/SocialActivitiesForm";
import ShoppingForm from "../components/calculator/ShoppingForm";
import HomeMaintenanceForm from "../components/calculator/HomeMaintenanceForm";
import { useNavigate } from "react-router-dom";

const CalculatorPage = () => {
  const [currentSection, setCurrentSection] = useState("Transportation");
  const navigate = useNavigate();

  // ✅ Centralized state for all forms
  const [formData, setFormData] = useState({
    transportation: {},
    energy: {},
    food: {},
    waste: {},
    water: {},
    social: {},
    shopping: {},
    home: {},
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const sanitizeInputs = (data) => {
    const categories = Object.keys(data);
    const sanitized = {};
    categories.forEach((cat) => {
      sanitized[cat] = {};
      Object.entries(data[cat]).forEach(([key, value]) => {
        sanitized[cat][key] = parseFloat(value) || 0;
      });
    });
    return sanitized;
  };

  const handleCalculate = async () => {
    try {
      const now = new Date();
      const week = Math.ceil(
        ((now - new Date(now.getFullYear(), 0, 1)) / 86400000 +
          new Date(now.getFullYear(), 0, 1).getDay() +
          1) /
          7
      );

      // ✅ Sanitize all inputs
      const sanitizedInputs = sanitizeInputs(formData);

      const res = await axios.post(
        "/api/carbon/add",
        {
          week,
          year: now.getFullYear(),
          inputs: sanitizedInputs,
        },
        { withCredentials: true }
      );

      console.log("Saved weekly entry:", res.data);

      navigate("/results", {
        state: { result: res.data, userId: res.data.entry.userId },
      });
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case "Transportation":
        return (
          <TransportationForm
            data={formData.transportation}
            onChange={(f, v) => handleChange("transportation", f, v)}
          />
        );
      case "Energy Use":
        return (
          <EnergyUseForm
            data={formData.energy}
            onChange={(f, v) => handleChange("energy", f, v)}
          />
        );
      case "Food Consumption":
        return (
          <FoodConsumptionForm
            data={formData.food}
            onChange={(f, v) => handleChange("food", f, v)}
          />
        );
      case "Waste Management":
        return (
          <WasteManagementForm
            data={formData.waste}
            onChange={(f, v) => handleChange("waste", f, v)}
          />
        );
      case "Water Usage":
        return (
          <WaterUsageForm
            data={formData.water}
            onChange={(f, v) => handleChange("water", f, v)}
          />
        );
      case "Social Activities":
        return (
          <SocialActivitiesForm
            data={formData.social}
            onChange={(f, v) => handleChange("social", f, v)}
          />
        );
      case "Shopping":
        return (
          <ShoppingForm
            data={formData.shopping}
            onChange={(f, v) => handleChange("shopping", f, v)}
          />
        );
      case "Home Maintenance":
        return (
          <HomeMaintenanceForm
            data={formData.home}
            onChange={(f, v) => handleChange("home", f, v)}
          />
        );
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className="">
      <div className="calculator-header">
        <div className="tag">CALCULATE - UNDERSTAND - IMPROVE</div>
        <h2>
          Your <span className="highlight">Carbon Footprint</span> Calculator
        </h2>
        <p>
          Discover your environmental impact and get personalized suggestions to
          reduce your carbon footprint.
        </p>
      </div>
      <CalculatorNavbar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      <div className="p-4">{renderSection()}</div>

      {/* ✅ Main Calculate Button */}
      <div className="p-4 flex justify-center">
        <button
          onClick={handleCalculate}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Calculate My Carbon Footprint
        </button>
      </div>
    </div>
  );
};

export default CalculatorPage;
