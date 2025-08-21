// src/pages/NewsPage.jsx
import React, { useEffect, useState } from "react";

const API_KEY = "d4d08f46c80346b29bea1abf30a5f0f0"; 
const API_URL = `https://newsapi.org/v2/everything?qInTitle=climate OR carbon OR environment OR climate change OR global warming OR climate crisis&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-8">
      <div className="calculator-header text-center mb-10">
        <div className="tag">CLIMATE - UPDATES - NEWS</div>
        <h2>
          Latest <span className="highlight">Climate News</span> & Updates
        </h2>
        <p>
          Stay informed with carbon footprint & environment-related news from
          trusted sources.
        </p>
      </div>

      {loading && <p className="text-center text-green-400">Loading news...</p>}

      <div className="max-w-6xl mx-auto">
        <div className="news-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition duration-300"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-green-400 text-sm mb-2">
                  {article.source?.name}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
