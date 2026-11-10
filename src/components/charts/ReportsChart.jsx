import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

import "./ReportsChart.css";

const data = [
  { time: "10am", sales: 54 },
  { time: "11am", sales: 31 },
  { time: "12am", sales: 57 },
  { time: "01am", sales: 36 },
  { time: "02am", sales: 23 },
  { time: "03am", sales: 49 },
  { time: "04am", sales: 13 },
  { time: "05am", sales: 35 },
  { time: "06am", sales: 67 },
  { time: "07am", sales: 55 },
  { time: "08am", sales: 73 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="reports-tooltip">
        <span>Sales</span>
        <strong>2,678</strong>
      </div>
    );
  }

  return null;
}

function ReportsChart() {
  return (
    <div className="reports-card">
      <div className="reports-header">
        <h3>Reports</h3>
        <button className="reports-menu">•••</button>
      </div>

      <div className="reports-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 15, right: 5, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#55baff" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#e94df5" />
              </linearGradient>

              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b9a0ff" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#b9a0ff" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#eeeeF4"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#9999aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: "#9999aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="none"
              fill="url(#areaGradient)"
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="url(#salesGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#ffffff",
                stroke: "#a78bfa",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportsChart;