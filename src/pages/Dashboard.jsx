import StatsCards from "../components/cards/StatsCards.jsx";

import ReportsChart from "../components/charts/ReportsChart.jsx";
import AnalyticsChart from "../components/charts/AnalyticsChart.jsx";

import RecentOrders from "../components/tables/RecentOrders.jsx";
import TopSellingProducts from "../components/cards/TopSellingProducts.jsx";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-content">

      {/* TOP STATISTICS CARDS */}
      <section className="dashboard-stats">
        <StatsCards />
      </section>

      {/* REPORTS AND ANALYTICS */}
      <section className="dashboard-charts">
        <div className="dashboard-reports">
          <ReportsChart />
        </div>

        <div className="dashboard-analytics">
          <AnalyticsChart />
        </div>
      </section>

      {/* RECENT ORDERS AND TOP SELLING PRODUCTS */}
      <section className="dashboard-bottom">
        <div className="dashboard-orders">
          <RecentOrders />
        </div>

        <div className="dashboard-products">
          <TopSellingProducts />
        </div>
      </section>

    </div>
  );
}

export default Dashboard;