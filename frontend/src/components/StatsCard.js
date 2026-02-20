import React from "react";
import "../styles/Dashboard.css";

function StatsCard({ title, value, color }) {
  return (
    <div className={`stats-card ${color}`}>
      <p className="stats-title">{title}</p>
      <h3 className="stats-value">{value}</h3>
    </div>
  );
}

export default StatsCard;
