// src/pages/CalculatorPage.jsx
import React, { useState } from "react";
import CalculatorNavbar from "../components/calculator/CalculatorNavbar";
import TransportationForm from "../components/calculator/TransportationForm";
import EnergyUseForm from "../components/calculator/EnergyUseForm";
import FoodConsumptionForm from "../components/calculator/FoodConsumptionForm";
import WasteManagementForm from "../components/calculator/WasteManagementForm";
import WaterUsageForm from "../components/calculator/WaterUsageForm";
import SocialActivitiesForm from "../components/calculator/SocialActivitiesForm";
import ShoppingForm from "../components/calculator/ShoppingForm";
import BuildingMaintenanceForm from "../components/calculator/BuildingMaintenanceForm";

// import other category components...

const CalculatorPage = () => {
  const [currentSection, setCurrentSection] = useState("Transportation");

  const renderSection = () => {
    switch (currentSection) {
      case "Transportation":
        return <TransportationForm />;
      case "Energy Use":
        return <EnergyUseForm />;
      case "Food Consumption":
        return <FoodConsumptionForm />;
      case "Waste Management":
        return <WasteManagementForm />;
      case "Water Usage":
        return <WaterUsageForm />;
      case "Social Activities":
        return <SocialActivitiesForm />;
      case "Shopping":
        return <ShoppingForm />;
      case "Home Maintenance":
        return <BuildingMaintenanceForm />;
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className="">
      <div className="calculator-header">
        <div className="tag">CALCULATE - UNDERSTAND - IMPROVE</div>
        <h2>Your <span className="highlight">Carbon Footprint</span> Calculator</h2>
        <p>Discover your environmental impact and get personalized suggestions to reduce your carbon footprint.</p>
      </div>
      <CalculatorNavbar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      <div className="p-4">{renderSection()}</div>
    </div>
  );
};

export default CalculatorPage;
