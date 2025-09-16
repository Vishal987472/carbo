import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, userId } = location.state || {};
  const [annual, setAnnual] = useState(null);
  const [weeklyResult, setWeeklyResult] = useState(result || null);

  useEffect(() => {
    const fetchAnnual = async () => {
      if (!userId) return console.error("No userId provided!");
      try {
        const year = new Date().getFullYear();

        // Fetch annual data
        const resAnnual = await axios.get(
          `/api/carbon/annual/${userId}/${year}`,
          { withCredentials: true }
        );
        setAnnual(resAnnual.data);

        // If weekly result is missing, fetch latest
        if (!weeklyResult) {
          const resWeekly = await axios.get(`/api/carbon/latest/${userId}`, {
            withCredentials: true,
          });
          setWeeklyResult(resWeekly.data.entry); // ✅ pick the entry field
        }
      } catch (err) {
        console.error("Error fetching emissions:", err);
      }
    };
    fetchAnnual();
  }, [userId]);

  if (!weeklyResult || !annual) {
    return <div className="text-white">Loading results...</div>;
  }

  // ✅ Weekly data
  const { total, breakdown, equivalents, suggestion } = weeklyResult;
  const weeklyKm = Math.round(equivalents.kmDriven || 0);
  const weeklyTrees = Math.round(equivalents.trees || 0);

  // ✅ Annual data
  const { annualTotal, annualKm, annualTrees, annualGallons, breakdown: annualBreakdown } =
    annual;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Carbon Footprint</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <SummaryCard title="Total Annual Emissions" value={`${annualTotal} kg CO₂`} />
        <SummaryCard title="Annual Distance Driven" value={`${annualKm} km`} />
        <SummaryCard title="Annual Trees Needed" value={annualTrees} />
        <SummaryCard title="Annual Fuel Used" value={`${annualGallons} gallons`} />

        <SummaryCard title="This Week's Emissions" value={`${total} kg CO₂`} />
        <SummaryCard title="This Week's Distance Driven" value={`${weeklyKm} km`} />
        <SummaryCard title="This Week's Trees Needed" value={weeklyTrees} />
      </div>

      {/* Weekly Breakdown */}
      <h2 className="text-2xl font-semibold mb-4">This Week's Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {Object.entries(breakdown).map(([category, value]) => (
          <CategoryCard key={category} category={category} value={value} total={total} />
        ))}
      </div>

      {/* Annual Breakdown */}
      <h2 className="text-2xl font-semibold mb-4">Annual Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {Object.entries(annualBreakdown).map(([category, value]) => (
          <CategoryCard
            key={category}
            category={category}
            value={Number(value.toFixed(2))}
            total={annualTotal}
          />
        ))}
      </div>

      {/* Suggestions */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
        <p className="text-gray-300">{suggestion}</p>
      </div>

      <button
        onClick={() => navigate("/calculator")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Calculate Again
      </button>
    </div>
  );
};

// Summary card component
const SummaryCard = ({ title, value }) => (
  <div className="bg-gray-800 rounded-2xl p-4 shadow-md">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

// Category card component
const CategoryCard = ({ category, value, total }) => {
  const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-md">
      <p className="font-semibold capitalize">{category}</p>
      <p className="text-gray-300">{value} kg CO₂</p>
      <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1">{percent}% of total</p>
    </div>
  );
};

export default ResultsPage;
