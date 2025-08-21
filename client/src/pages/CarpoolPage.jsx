// src/pages/CarpoolPage.jsx
import React, { useState, useEffect } from "react";

const CarpoolPage = () => {
  const [createRide, setCreateRide] = useState({
    startLocation: "",
    destination: "",
    carModel: "",
    distance: "",
    pickupPoint: "",
    seatsAvailable: "",
  });

  const [joinRide, setJoinRide] = useState({
    startFrom: "",
    destination: "",
  });

  const [rides, setRides] = useState([]);

  // ✅ Fetch available rides from backend
  useEffect(() => {
    fetch("/api/carpool")
      .then((res) => res.json())
      .then((data) => setRides(data))
      .catch((err) => console.error("❌ Error fetching rides:", err));
  }, []);

  // ✅ Create ride
  const handleCreateRide = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/carpool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createRide),
      });

      if (res.ok) {
        const newRide = await res.json();
        setRides((prev) => [newRide, ...prev]); // add new ride on top
        setCreateRide({
          startLocation: "",
          destination: "",
          carModel: "",
          distance: "",
          pickupPoint: "",
          seatsAvailable: "",
        });
      }
    } catch (err) {
      console.error("❌ Error creating ride:", err);
    }
  };

  // ✅ Book a ride (reduce seatsAvailable by 1)
const handleBookRide = async (id) => {
  try {
    const res = await fetch(`/api/carpool/${id}/book`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (res.ok) {
      const updatedRide = data.ride; // ✅ get updated ride object

      setRides((prev) =>
        prev.map((ride) =>
          ride._id === updatedRide._id ? { ...ride, ...updatedRide } : ride
        )
      );

      alert("✅ Ride booked successfully!");
    } else {
      alert(data.error || "❌ Failed to book ride");
    }
  } catch (err) {
    console.error("❌ Error booking ride:", err);
  }
};


  // ✅ Filter rides based on search
  const filteredRides = rides.filter(
    (ride) =>
      ride.startLocation
        .toLowerCase()
        .includes(joinRide.startFrom.toLowerCase()) &&
      ride.destination
        .toLowerCase()
        .includes(joinRide.destination.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="calculator-header">
        <div className="tag">SHARE · RIDE · REDUCE EMISSIONS</div>
        <h2>
          Smart <span className="highlight">Carpooling</span> for a Greener Planet
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Ride */}
        <div className="bg-[#1b263b] rounded-xl p-6 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-green-400">🚗</span> Create a Ride
          </h2>
          <form onSubmit={handleCreateRide} className="space-y-4">
            <input
              type="text"
              placeholder="Start Location"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.startLocation}
              onChange={(e) =>
                setCreateRide({ ...createRide, startLocation: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.destination}
              onChange={(e) =>
                setCreateRide({ ...createRide, destination: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Car Model"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.carModel}
              onChange={(e) =>
                setCreateRide({ ...createRide, carModel: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Distance (km)"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.distance}
              onChange={(e) =>
                setCreateRide({ ...createRide, distance: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Pickup Point"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.pickupPoint}
              onChange={(e) =>
                setCreateRide({ ...createRide, pickupPoint: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Seats Available"
              className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={createRide.seatsAvailable}
              onChange={(e) =>
                setCreateRide({ ...createRide, seatsAvailable: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
            >
              Create Ride
            </button>
          </form>
        </div>

        {/* Join Ride */}
        <div className="bg-[#1b263b] rounded-xl p-6 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <span className="text-green-400">🧍‍♂️</span> Join a Ride
          </h2>
          <div className="flex gap-1 mb-4">
            <input
              type="text"
              placeholder="Start From"
              className="flex-1 p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={joinRide.startFrom}
              onChange={(e) =>
                setJoinRide({ ...joinRide, startFrom: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Destination"
              className="flex-1 p-3 rounded-lg bg-[#0d1b2a] border border-gray-600"
              value={joinRide.destination}
              onChange={(e) =>
                setJoinRide({ ...joinRide, destination: e.target.value })
              }
            />
            <button className="bg-green-500 hover:bg-green-600 px-3 rounded-lg">
              Search
            </button>
          </div>

          <div className="space-y-4">
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => (
                <div
                  key={ride._id}
                  className="bg-[#0d1b2a] p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {ride.startLocation} → {ride.destination}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Car: {ride.carModel} | Pickup: {ride.pickupPoint}
                    </p>
                    <p className="text-sm">Seats: {ride.seatsAvailable}</p>
                  </div>
                  <button
                    onClick={() => handleBookRide(ride._id)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm"
                    disabled={ride.seatsAvailable <= 0}
                  >
                    {ride.seatsAvailable > 0 ? "Book this ride" : "Full"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No rides available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpoolPage;
