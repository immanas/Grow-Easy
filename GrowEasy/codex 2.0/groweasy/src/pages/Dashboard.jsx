// src/pages/Dashboard.jsx
import ProductTable from "../components/ProductTable";
import SummaryCard from "../components/SummaryCard";
import AnalyticsChart from "../components/AnalyticsChart";
import NotificationPanel from "../components/NotificationPanel";
import DataRefreshIndicator from "../components/DataRefreshIndicator";

export default function Dashboard() {
  // Example KPIs – you can later fetch these dynamically from your API
  const kpis = [
    { title: "Total Sales Today", value: "$2,450" },
    { title: "Total Orders", value: "320" },
    { title: "Total Products in Stock", value: "1,240" },
    { title: "Active Customers", value: "980" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          GrowEasy — AI-powered Retail Dashboard 🚀
        </h1>
        <DataRefreshIndicator />
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, idx) => (
          <SummaryCard key={idx} title={kpi.title} value={kpi.value} />
        ))}
      </div>

      {/* Chart + Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
          <AnalyticsChart />
        </div>
        <NotificationPanel />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <ProductTable />
      </div>
    </div>
  );
}
