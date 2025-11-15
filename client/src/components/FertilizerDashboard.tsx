import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip
);

// ---------------------------
// Animation variants
// ---------------------------
const pageFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const containerStats: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const chartTitle: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const chartCanvasAnim: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const listContainer = (delay: number = 0): Variants => ({


  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: delay,
    },
  },
});

// ---------------------------
// Reusable Card (animated wrapper)
// ---------------------------
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <motion.div
    variants={itemFadeUp}
    initial="hidden"
    animate="show"
    className={`backdrop-blur bg-white/70 shadow-lg rounded-2xl p-6 border border-gray-200 ${className}`}
  >
    {children}
  </motion.div>
);

// ---------------------------
// Stats Card
// ---------------------------
const StatsCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode }> = ({
  title,
  value,
  change,
  icon,
}) => {
  const isPositive = change.includes("+");
  const isNegative = change.includes("-") || change.includes("No change");

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-gray-600">{title}</p>
          <div
            className={`p-2 rounded-xl ${
              isPositive ? "bg-green-100" : isNegative ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            {icon}
          </div>
        </div>

        <h3 className="text-3xl font-bold">{value}</h3>

        <p className={`mt-2 text-sm flex items-center gap-1 ${isPositive ? "text-green-600" : isNegative ? "text-red-600" : ""}`}>
          {isPositive ? "↗" : isNegative ? "↘" : "→"} {change}
        </p>
      </Card>
    </motion.div>
  );
};

// ---------------------------
// List Item (animated)
// ---------------------------
const ListItem: React.FC<{ rank: number; name: string; value: string; isLowStock?: boolean }> = ({
  rank,
  name,
  value,
  isLowStock = false,
}) => (
  <motion.div variants={itemFadeUp} className="flex justify-between items-center py-3 border-b last:border-none">
    <span className="font-medium text-gray-700">{rank}. {name}</span>
    <span className={`${isLowStock ? "text-red-600" : "text-green-600"} font-semibold`}>{value}</span>
  </motion.div>
);

// ---------------------------
// Product List (animated container + items)
// ---------------------------
const ProductList: React.FC<{ title: string; items: { name: string; value: string }[]; isLowStock?: boolean; delay?: number }> = ({
  title,
  items,
  isLowStock = false,
  delay = 0,
}) => (
  <motion.div variants={itemFadeUp} initial="hidden" animate="show">
    <motion.div variants={itemFadeUp} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <motion.div variants={listContainer(delay)} initial="hidden" animate="show">
        {items.map((it, idx) => (
          <ListItem
            key={idx}
            rank={idx + 1}
            name={it.name}
            value={it.value}
            isLowStock={isLowStock}
          />
        ))}
      </motion.div>
    </motion.div>
  </motion.div>
);

// ---------------------------
// Forecast Chart (chart.js) with small entrance animation wrapper
// ---------------------------
const ForecastChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        ],
        datasets: [
          {
            label: "Availability",
            data: [1200,1400,1250,1500,1800,2100,2300,2100,2000,1800,1500,1300],
            borderColor: "#10b981",
            backgroundColor: "rgba(16,185,129,0.18)",
            tension: 0.36,
            fill: true,
            pointRadius: 2,
          },
          {
            label: "Requirement",
            data: [1300,1500,1300,1600,1900,2000,1900,1800,1700,1500,1300,1250],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.16)",
            tension: 0.36,
            fill: true,
            pointRadius: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
          x: { grid: { display: false } },
        },
      }
    });

    return () => { chartInstance.current?.destroy(); };
  }, []);

  return (
    <motion.div variants={itemFadeUp} initial="hidden" animate="show">
      <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
        <motion.div variants={chartTitle} className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Urea Availability vs Requirement — Annual</h2>
          <select className="px-3 py-2 border rounded-lg text-sm shadow-sm">
            <option>Urea (46% N)</option>
            <option>MOP</option>
            <option>DAP</option>
          </select>
        </motion.div>

        <motion.div variants={chartCanvasAnim} initial="hidden" animate="show" className="h-80">
          <canvas ref={chartRef}></canvas>
        </motion.div>

        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            Availability
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            Requirement
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------
// Data (mock)
// ---------------------------
const topDemandProducts = [
  { name: "MOP (Muriate of Potash)", value: "18,000 MT" },
  { name: "Urea (46% N)", value: "15,000 MT" },
  { name: "DAP (18-46-0)", value: "12,000 MT" },
  { name: "NPK 20:20:0", value: "10,000 MT" },
  { name: "NPK 10:26:26", value: "8,500 MT" },
];

const lowStockProducts = [
  { name: "Calcium Nitrate", value: "2,500 MT" },
  { name: "Zinc Sulphate", value: "3,000 MT" },
  { name: "Gypsum", value: "4,000 MT" },
  { name: "SSP (Single Superphosphate)", value: "5,500 MT" },
  { name: "Ammonium Sulphate", value: "6,500 MT" },
];

// ---------------------------
// Main component (stagger order)
// ---------------------------
const FertilizerDashboard: React.FC = () => {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <motion.h1 variants={itemFadeUp} className="text-3xl font-bold mb-8">
          Fertilizer Inventory Dashboard
        </motion.h1>

        {/* Stage 2: Stats cards (staggered) */}
        <motion.div variants={containerStats} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Order enforced by declaration order below */}
          <StatsCard
            title="Total Inventory Value"
            value="₹28,850,000"
            change="+4.5% vs last month"
            icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
          />
          <StatsCard
            title="Critical Stock Items"
            value="1"
            change="-25% vs last month"
            icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.938 20h14.124c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" /></svg>}
          />
          <StatsCard
            title="Total Products"
            value="10"
            change="+1.2% vs last month"
            icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>}
          />
          <StatsCard
            title="Supply Deficit Items"
            value="4"
            change="No change vs last month"
            icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>}
          />
        </motion.div>

        {/* Stage 3 + 4: Chart + Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart area (title -> canvas) */}
          <motion.div variants={itemFadeUp} initial="hidden" animate="show" className="lg:col-span-2">
            <ForecastChart />
          </motion.div>

          {/* Product lists: each list has its own stagger (delay set so chart animates first) */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="show" variants={listContainer(0.2)}>
              <ProductList title="Top 5 Most Required (Demand)" items={topDemandProducts} isLowStock={false} delay={0.2} />
            </motion.div>

            <motion.div initial="hidden" animate="show" variants={listContainer(0.2)}>
              <ProductList title="Top 5 Least Available (Low Stock)" items={lowStockProducts} isLowStock={true} delay={0.2} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FertilizerDashboard;
