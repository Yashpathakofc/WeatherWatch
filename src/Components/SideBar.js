import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchNewsUpdates = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1d47d0b9ae2f4681b9684122d7b59eca`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Fetched data:', data);
        if (data.status === "ok" && data.articles.length > 0) {
          const newsUpdates = data.articles.slice(0, 15).map(article => article.title);
          setUpdates(newsUpdates);
        } else {
          console.warn('No news articles found or unexpected data structure:', data);
        }
      } catch (error) {
        console.error("Error fetching news updates:", error);
      }
    };

    fetchNewsUpdates();
  }, []);

  return (
    <div className="sidebar">
      <h2>Economic Updates ₹</h2>
      <div className="updates">
        {updates.length > 0 ? (
          updates.map((update, index) => (
            <div key={index}>{update}</div>
          ))
        ) : (
          <div>No news updates available</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
