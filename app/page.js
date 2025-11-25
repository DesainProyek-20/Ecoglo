"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const DB_URL =
    "https://ecoglo-1849b-default-rtdb.asia-southeast1.firebasedatabase.app";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${DB_URL}/ecoglo/device1/latest.json`);
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>EcoGlo Realtime Dashboard</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>CO₂: {data.co2} ppm</p>
          <p>pH: {data.ph}</p>
          <p>Lux: {data.lux}</p>
          <p>Temp: {data.temp} °C</p>
          <p>Timestamp: {new Date(data.ts * 1000).toLocaleString()}</p>
        </div>
      )}
    </main>
  );
}
