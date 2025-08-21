// src/pages/ShopPage.jsx
import React, { useEffect, useState } from "react";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=eco`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const ecoShops = data.products.map((item) => ({
          _id: item.id,
          name: item.title,
          logo: item.thumbnail || "https://img.icons8.com/fluency/96/shopping-cart.png",
          exampleItem: item.description?.substring(0, 50) + "...",
          price: `$${item.price}`,
          rating: item.rating.toFixed(1),
          url: `https://dummyjson.com/products/${item.id}`, // product detail page
        }));

        setShops(ecoShops);
      } catch (error) {
        console.error("Error fetching shops:", error);
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-8">
      {/* Header */}
      <div className="calculator-header text-center mb-10">
        <div className="tag">
          <i className="fas fa-shopping-bag mr-2"></i>
          Sustainable Products
        </div>
        <h2>
          Discover <span className="highlight">Eco-Friendly</span> Shops
        </h2>
        <p>
          Browse our collection of eco-friendly products to reduce your carbon
          footprint and support sustainable living.
        </p>
      </div>

      {/* Shops Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-gray-400 text-center">Loading shops...</p>
        ) : shops.length === 0 ? (
          <p className="text-red-400 text-center">No eco-friendly products found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="bg-[#1e293b] rounded-xl shadow-lg hover:shadow-green-500/20 transition duration-300 overflow-hidden"
              >
                <div className="p-5 flex items-center gap-4">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-16 h-16 object-contain rounded-full border border-gray-700 bg-white p-2"
                  />
                  <div>
                    <a
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-green-400 hover:underline"
                    >
                      {shop.name}
                    </a>
                    <p className="text-gray-400 text-sm">{shop.exampleItem}</p>
                    <p className="text-green-400 text-sm mt-1">
                      💲 {shop.price}
                    </p>
                    <p className="text-yellow-400 text-sm mt-1">
                      ⭐ {shop.rating}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
