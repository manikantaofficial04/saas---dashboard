import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";

import "./Analytics.css";

const revenueData = [
  { month: "Jan", revenue: 12000, orders: 450 },
  { month: "Feb", revenue: 18000, orders: 520 },
  { month: "Mar", revenue: 15000, orders: 480 },
  { month: "Apr", revenue: 24000, orders: 680 },
  { month: "May", revenue: 21000, orders: 620 },
  { month: "Jun", revenue: 30000, orders: 850 },
  { month: "Jul", revenue: 27000, orders: 780 },
  { month: "Aug", revenue: 35000, orders: 950 },
  { month: "Sep", revenue: 32000, orders: 900 },
  { month: "Oct", revenue: 42000, orders: 1100 },
  { month: "Nov", revenue: 38000, orders: 1050 },
  { month: "Dec", revenue: 48000, orders: 1250 },
];

const categoryData = [
  { name: "Electronics", value: 40 },
  { name: "Fashion", value: 25 },
  { name: "Beauty", value: 20 },
  { name: "Others", value: 15 },
];

const trafficData = [
  { source: "Direct", visitors: 4500 },
  { source: "Social", visitors: 3200 },
  { source: "Search", visitors: 5800 },
  { source: "Referral", visitors: 2100 },
];

const products = [
  {
    name: "Camera Lens",
    category: "Electronics",
    sales: 325,
    revenue: "$57,850",
  },
  {
    name: "Black Sleep Dress",
    category: "Fashion",
    sales: 253,
    revenue: "$35,420",
  },
  {
    name: "Argan Oil",
    category: "Beauty",
    sales: 178,
    revenue: "$21,560",
  },
  {
    name: "EAU DE Parfum",
    category: "Beauty",
    sales: 142,
    revenue: "$18,240",
  },
];

const colors = ["#625BFF", "#8E87FF", "#B9B4FF", "#E3E1FF"];

const stats = [
  {
    title: "Total Revenue",
    value: "$48,294",
    change: "+12.8%",
    positive: true,
    icon: DollarSign,
    className: "revenue",
  },
  {
    title: "Total Orders",
    value: "2,845",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
    className: "orders",
  },
  {
    title: "Total Customers",
    value: "1,893",
    change: "+15.4%",
    positive: true,
    icon: Users,
    className: "customers",
  },
  {
    title: "Conversion Rate",
    value: "3.64%",
    change: "-2.1%",
    positive: false,
    icon: TrendingUp,
    className: "conversion",
  },
];

function Analytics() {
  return (
    <div className="analytics-page">

      {/* Page Header */}
      <div className="analytics-header">
        <div>
          <h2>Analytics Overview</h2>
          <p>Track your business performance and growth.</p>
        </div>

        <div className="analytics-header-actions">
          <select defaultValue="year">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <button className="analytics-export-btn">
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="analytics-stats-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="analytics-stat-card" key={index}>
              <div className="analytics-stat-top">
                <div className={`analytics-stat-icon ${item.className}`}>
                  <Icon size={21} />
                </div>

                <span
                  className={`analytics-change ${
                    item.positive ? "positive" : "negative"
                  }`}
                >
                  {item.positive ? (
                    <ArrowUpRight size={15} />
                  ) : (
                    <ArrowDownRight size={15} />
                  )}
                  {item.change}
                </span>
              </div>

              <p>{item.title}</p>
              <h3>{item.value}</h3>
              <span className="analytics-stat-caption">
                Compared to last month
              </span>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="analytics-chart-card analytics-revenue-card">
        <div className="analytics-card-header">
          <div>
            <h3>Revenue Analytics</h3>
            <p>Monthly revenue performance</p>
          </div>

          <span className="analytics-chart-label">
            <span></span> Revenue
          </span>
        </div>

        <div className="analytics-revenue-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 15, right: 15, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#625BFF"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#625BFF"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#EEEEF3"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#92929D", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#92929D", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#625BFF"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category and Traffic Charts */}
      <div className="analytics-middle-grid">

        {/* Category Chart */}
        <div className="analytics-chart-card">
          <div className="analytics-card-header">
            <div>
              <h3>Sales by Category</h3>
              <p>Product category distribution</p>
            </div>
          </div>

          <div className="analytics-category-content">
            <div className="analytics-pie-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={colors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-category-legend">
              {categoryData.map((item, index) => (
                <div className="analytics-legend-item" key={item.name}>
                  <div>
                    <span
                      style={{ backgroundColor: colors[index] }}
                    ></span>
                    <p>{item.name}</p>
                  </div>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="analytics-chart-card">
          <div className="analytics-card-header">
            <div>
              <h3>Traffic Sources</h3>
              <p>Website visitors by source</p>
            </div>
          </div>

          <div className="analytics-traffic-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trafficData}
                margin={{ top: 15, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EEEEF3"
                />

                <XAxis
                  dataKey="source"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92929D", fontSize: 11 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92929D", fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="visitors"
                  fill="#625BFF"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="analytics-chart-card analytics-products-card">
        <div className="analytics-card-header">
          <div>
            <h3>Top Performing Products</h3>
            <p>Best-selling products this year</p>
          </div>

          <button className="analytics-view-all">
            View All
          </button>
        </div>

        <div className="analytics-table-wrapper">
          <table className="analytics-products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Total Sales</th>
                <th>Total Revenue</th>
                <th>Performance</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product.name}>
                  <td>
                    <div className="analytics-product-name">
                      <span>{index + 1}</span>
                      {product.name}
                    </div>
                  </td>

                  <td>{product.category}</td>
                  <td>{product.sales}</td>
                  <td className="analytics-revenue-value">
                    {product.revenue}
                  </td>

                  <td>
                    <div className="analytics-performance">
                      <div>
                        <span
                          style={{
                            width: `${100 - index * 17}%`,
                          }}
                        ></span>
                      </div>
                      <small>{100 - index * 17}%</small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Analytics;