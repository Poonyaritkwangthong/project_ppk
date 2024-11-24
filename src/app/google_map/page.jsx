"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [mapData, setMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMap();
  }, []);

  const fetchMap = async () => {
    try {
      const response = await fetch(
        "http://localhost/api/map?key=b61cfb736410528d1a43acd445cf35bb"
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch map data");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid map data format");
      }

      setMapData(data);
    } catch (error) {
      Swal.fire({
        text: error.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-black">
      {isLoading ? (
        <p>Loading map data...</p>
      ) : mapData.length > 0 ? (
        mapData.map((map) => (
          <div key={map.id}>
            <h3>{map.name}</h3>
            <p>{map.description}</p>
          </div>
        ))
      ) : (
        <p>No map data available</p>
      )}
    </div>
  );
}
