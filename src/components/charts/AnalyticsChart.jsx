import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import "./AnalyticsChart.css";

const analyticsData = [
  { name: "Sale", value: 45, color: "#5790ff" },
  { name: "Distribute", value: 30, color: "#ffbd24" },
  { name: "Return", value: 25, color: "#ff896d" },
];

function AnalyticsChart() {
  return (
    <div className="analytics-card">

      <div className="analytics-header">
        <h3>Analytics</h3>
        <button className="analytics-menu">•••</button>
      </div>

      <div className="analytics-chart-wrapper">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={analyticsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {analyticsData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="analytics-center">
          <h2>80%</h2>
          <p>Transactions</p>
        </div>

      </div>

      <div className="analytics-legend">
        {analyticsData.map((item) => (
          <div className="legend-item" key={item.name}>
            <span
              className="legend-dot"
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AnalyticsChart;