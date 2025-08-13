import React, { useState, useEffect } from "react";

function DataRefreshIndicator() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-gray-500 text-sm">
      Last updated: <span className="font-semibold">{time}</span>
    </div>
  );
}

export default DataRefreshIndicator;
