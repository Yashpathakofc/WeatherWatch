import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const RightSidebar = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const url = `https://feedapi.tickermarket.com/TPILWebAPI/Api/V1/Data/NseEquit`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Fetched stock market data:', data); // Debugging line

        if (data.results && data.results.length > 0) {
          setStockData(data.results[0]);
        } else {
          console.warn('No stock market data found or unexpected data structure:', data);
        }
      } catch (error) {
        console.error("Error fetching stock market data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="sidebar">
      <h2>Stock Market News</h2>
      <div className="updates">
        {stockData ? (
          <div>
            <div>Open: {stockData.o}</div>
            <div>High: {stockData.h}</div>
            <div>Low: {stockData.l}</div>
            <div>Close: {stockData.c}</div>
            <div>Volume: {stockData.v}</div>
          </div>
        ) : (
          <div>No stock market data available</div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
