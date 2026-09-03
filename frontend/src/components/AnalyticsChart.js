import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = ({ analytics }) => {
  if (!analytics) return null;

  const {
    weeklyData,
    priorityData,
    categoryData,
    bestDay,
    bestDayCount,
    topCategory,
    topCategoryPercent,
    thisWeekTotal,
    streak,
    days,
  } = analytics;

  // Chart data
  const chartData = {
    labels: days,
    datasets: [
      {
        label: "💼 Work",
        data: weeklyData.Work,
        backgroundColor: "rgba(133, 183, 235, 0.7)",
        borderColor: "#85B7EB",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "📚 Study",
        data: weeklyData.Study,
        backgroundColor: "rgba(175, 169, 236, 0.7)",
        borderColor: "#AFA9EC",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "🙂 Personal",
        data: weeklyData.Personal,
        backgroundColor: "rgba(237, 147, 177, 0.7)",
        borderColor: "#ED93B1",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#11161d",
        borderColor: "#232a35",
        borderWidth: 1,
        titleColor: "#e6e9ef",
        bodyColor: "#828a99",
      },
    },
    scales: {
      x: {
        grid: { color: "#1a2030" },
        ticks: { color: "#828a99", font: { size: 11 } },
        border: { color: "#232a35" },
      },
      y: {
        grid: { color: "#1a2030" },
        ticks: { color: "#828a99", font: { size: 11 }, stepSize: 1 },
        border: { color: "#232a35" },
        beginAtZero: true,
      },
    },
  };

  // Total tasks
  const totalTasks =
    (categoryData.Work || 0) +
    (categoryData.Study || 0) +
    (categoryData.Personal || 0);

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <span className="analytics-title">📈 Analytics</span>
      </div>

      {/* Insight Cards */}
      <div className="insight-cards">
        <div className="insight-card">
          <span className="insight-icon">📅</span>
          <div className="insight-content">
            <p className="insight-label">This Week</p>
            <p className="insight-value">{thisWeekTotal} tasks</p>
            <p className="insight-sub">completed</p>
          </div>
        </div>
        <div className="insight-card">
          <span className="insight-icon">🏆</span>
          <div className="insight-content">
            <p className="insight-label">Best Day</p>
            <p className="insight-value">{bestDay}</p>
            <p className="insight-sub">
              {bestDayCount > 0 ? `${bestDayCount} tasks` : "No data yet"}
            </p>
          </div>
        </div>
        <div className="insight-card">
          <span className="insight-icon">💼</span>
          <div className="insight-content">
            <p className="insight-label">Top Category</p>
            <p className="insight-value">{topCategory}</p>
            <p className="insight-sub">{topCategoryPercent}% of tasks</p>
          </div>
        </div>
        <div className="insight-card">
          <span className="insight-icon">🔥</span>
          <div className="insight-content">
            <p className="insight-label">Streak</p>
            <p className="insight-value">{streak} {streak === 1 ? "day" : "days"}</p>
            <p className="insight-sub">
              {streak > 0 ? "Keep it going!" : "Start today!"}
            </p>
          </div>
        </div>
      </div>

      {/* Chart + Priority Grid */}
      <div className="analytics-grid">

        {/* Grouped Bar Chart */}
        <div className="chart-card">
          <p className="chart-card-title">📅 Tasks Completed This Week — by Category</p>
          <div className="analytics-legend">
            <div className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: "#85B7EB" }}></span>
              💼 Work
            </div>
            <div className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: "#AFA9EC" }}></span>
              📚 Study
            </div>
            <div className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: "#ED93B1" }}></span>
              🙂 Personal
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Priority + Category Breakdown */}
        <div className="chart-card">
          <p className="chart-card-title">🎯 Priority Breakdown</p>
          <div className="priority-breakdown-list">

            <div className="priority-breakdown-item">
              <div className="priority-breakdown-header">
                <span className="priority-breakdown-label">
                  <span className="priority-breakdown-dot" style={{ background: "#F0997B" }}></span>
                  High
                </span>
                <span className="priority-breakdown-count">{priorityData.High} tasks</span>
              </div>
              <div className="priority-breakdown-track">
                <div
                  className="priority-breakdown-fill"
                  style={{
                    width: totalTasks > 0 ? `${(priorityData.High / totalTasks) * 100}%` : "0%",
                    background: "#F0997B",
                  }}
                ></div>
              </div>
            </div>

            <div className="priority-breakdown-item">
              <div className="priority-breakdown-header">
                <span className="priority-breakdown-label">
                  <span className="priority-breakdown-dot" style={{ background: "#EF9F27" }}></span>
                  Medium
                </span>
                <span className="priority-breakdown-count">{priorityData.Medium} tasks</span>
              </div>
              <div className="priority-breakdown-track">
                <div
                  className="priority-breakdown-fill"
                  style={{
                    width: totalTasks > 0 ? `${(priorityData.Medium / totalTasks) * 100}%` : "0%",
                    background: "#EF9F27",
                  }}
                ></div>
              </div>
            </div>

            <div className="priority-breakdown-item">
              <div className="priority-breakdown-header">
                <span className="priority-breakdown-label">
                  <span className="priority-breakdown-dot" style={{ background: "#5DCAA5" }}></span>
                  Low
                </span>
                <span className="priority-breakdown-count">{priorityData.Low} tasks</span>
              </div>
              <div className="priority-breakdown-track">
                <div
                  className="priority-breakdown-fill"
                  style={{
                    width: totalTasks > 0 ? `${(priorityData.Low / totalTasks) * 100}%` : "0%",
                    background: "#5DCAA5",
                  }}
                ></div>
              </div>
            </div>

          </div>

          {/* Category Summary */}
          <div className="category-summary">
            <div className="category-summary-card">
              <p className="category-summary-label">💼 Work</p>
              <p className="category-summary-number" style={{ color: "#85B7EB" }}>
                {categoryData.Work}
              </p>
            </div>
            <div className="category-summary-card">
              <p className="category-summary-label">📚 Study</p>
              <p className="category-summary-number" style={{ color: "#AFA9EC" }}>
                {categoryData.Study}
              </p>
            </div>
            <div className="category-summary-card">
              <p className="category-summary-label">🙂 Personal</p>
              <p className="category-summary-number" style={{ color: "#ED93B1" }}>
                {categoryData.Personal}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;