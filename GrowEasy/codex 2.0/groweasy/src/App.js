import React, { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ===== Helpers =====
const formatCurrency = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// ===== Mock Data =====
const MOCK_DASH = { totalProducts: 124, totalSalesToday: 125000, forecast7d: 320, productsNeedingRestock: 12 };
const MOCK_PRODUCTS = [
  { id: 1, name: "Handmade Mug", category: "Home", stock: 25, reorderThreshold: 8, price: 450, forecast7: 10, restockSuggestion: 0, optimalPrice: 430, expectedImpact: 8, velocity: 2 },
  { id: 2, name: "Organic Tea", category: "Grocery", stock: 6, reorderThreshold: 12, price: 250, forecast7: 20, restockSuggestion: 50, optimalPrice: 230, expectedImpact: 12, velocity: 3 },
  { id: 3, name: "Notebook", category: "Stationery", stock: 0, reorderThreshold: 5, price: 120, forecast7: 5, restockSuggestion: 100, optimalPrice: 110, expectedImpact: 15, velocity: 1 }
];
const MOCK_FVA = [
  { date: "2025-07-14", forecast: 120, actual: 90 },
  { date: "2025-07-15", forecast: 133, actual: 128 },
  { date: "2025-07-16", forecast: 140, actual: 110 },
  { date: "2025-07-17", forecast: 118, actual: 130 },
  { date: "2025-07-18", forecast: 150, actual: 70 },
  { date: "2025-07-19", forecast: 125, actual: 122 }
];
const MOCK_REGION = [
  { name: "Delhi", value: 120 },
  { name: "Mumbai", value: 95 },
  { name: "Bengaluru", value: 80 }
];
const MOCK_NOTIFICATIONS = [
  "Price change approved for Organic Tea",
  "Low stock alert: Notebook",
  "Forecast updated for next week"
];

// ===== Components =====
function Header({ onToggleTheme, theme }) {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-emerald-700">GrowEasy</div>
        <nav className="hidden md:flex gap-4 text-sm text-slate-600 dark:text-slate-300">
          <a href="#dashboard" className="hover:underline">Dashboard</a>
          <a href="#analytics" className="hover:underline">Analytics</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <a href="#settings" className="hover:underline">Settings</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600 dark:text-slate-300">AI-powered retail growth assistant 🚀</div>
        <button onClick={onToggleTheme} className="p-2 rounded-md bg-slate-100 dark:bg-slate-700">
          {theme === "dark" ? "🌙" : "🌞"}
        </button>
      </div>
    </header>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
      <div className="text-sm text-slate-500 dark:text-slate-300">{title}</div>
      <div className="mt-2 text-2xl font-semibold">
        {typeof value === "number" ? formatCurrency(value) : value}
      </div>
    </div>
  );
}

function ProductTable({ products, onApplyPrice }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())), [products, q]);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search product"
          className="p-2 rounded-md bg-slate-100 dark:bg-slate-700" />
      </div>
      <table className="w-full table-auto text-sm">
        <thead className="text-slate-500 dark:text-slate-300">
          <tr>
            <th>Product</th><th>Category</th><th>Stock</th><th>Price</th><th>Forecast (7d)</th><th>Restock</th><th>Optimal Price</th><th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} className="border-t border-slate-100 dark:border-slate-700">
              <td>{p.name}</td><td>{p.category}</td>
              <td>{p.stock}</td><td>{formatCurrency(p.price)}</td>
              <td>{p.forecast7}</td><td>{p.restockSuggestion}</td>
              <td>{formatCurrency(p.optimalPrice)}</td>
              <td><button onClick={() => onApplyPrice(p.id, p.optimalPrice)} className="px-3 py-1 bg-emerald-600 text-white rounded-md">Apply AI Price</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Forecast vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend />
          <Line type="monotone" dataKey="forecast" stroke="#8884d8" />
          <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SalesByRegion({ data }) {
  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b"];
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Sales by Region</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function RestockEngine({ items }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between h-full">
      <h2 className="text-lg font-semibold mb-4">Restock Suggestions</h2>
      {items.length === 0 ? (
        <div className="text-sm text-slate-500">All products well stocked</div>
      ) : (
        <table className="w-full table-auto text-sm">
          <thead className="text-slate-500 dark:text-slate-300">
            <tr><th>Product</th><th>Days to Stockout</th><th>Suggested Qty</th></tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-slate-200 dark:border-slate-700">
                <td>{item.name}</td><td>{item.daysUntilStockout}</td>
                <td className="font-semibold text-emerald-600">{item.suggestedQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function HealthScore({ score }) {
  const color = score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-rose-600";
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-center items-center h-full">
      <h2 className="text-lg font-semibold mb-2">Retail Health Score</h2>
      <div className={`text-4xl font-bold ${color}`}>{score}</div>
      <div className="text-sm text-slate-500 mt-1">Out of 100</div>
    </div>
  );
}

function Notifications({ items }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {items.length === 0 ? (
        <div className="text-sm text-slate-500">No new notifications</div>
      ) : (
        <ul className="space-y-2">
          {items.map((n, i) => (
            <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Footer() {
  return <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} GrowEasy</footer>;
}

// ===== Main App =====
export default function App() {
  const [theme, setTheme] = useState("light");
  const [dashboard] = useState(MOCK_DASH);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  const handleApplyPrice = (id, newPrice) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, price: newPrice } : p)));
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-slate-900" : "bg-slate-50"}`}>
      <Header onToggleTheme={toggleTheme} theme={theme} />
      <main className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard title="Total Products in Stock" value={dashboard.totalProducts} />
          <SummaryCard title="Total Sales Today" value={dashboard.totalSalesToday} />
          <SummaryCard title="Forecasted Demand (7d)" value={dashboard.forecast7d} />
          <SummaryCard title="Products Needing Restock" value={dashboard.productsNeedingRestock} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><AnalyticsChart data={MOCK_FVA} /></div>
          <SalesByRegion data={MOCK_REGION} />
        </div>

        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProductTable products={products} onApplyPrice={handleApplyPrice} />
          </div>
          <div className="space-y-6">
            <RestockEngine items={products.filter(p => p.stock < p.reorderThreshold).map(p => ({
              id: p.id, name: p.name,
              daysUntilStockout: Math.ceil((p.stock || 0) / (p.velocity || 1)),
              suggestedQty: 50
            }))} />
            <HealthScore score={78} />
            <Notifications items={MOCK_NOTIFICATIONS} />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
