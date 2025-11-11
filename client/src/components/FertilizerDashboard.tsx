import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip);

// ============================================
// TYPES
// ============================================
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface ListItemProps {
  rank: number;
  name: string;
  value: string;
  isLowStock: boolean;
}

interface ProductItem {
  name: string;
  value: string;
}

interface ProductListProps {
  title: string;
  items: ProductItem[];
  isLowStock: boolean;
}

// ============================================
// ICONS COMPONENTS
// ============================================
const InventoryIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round"   strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DeficitIcon = () => (
  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.includes('+');
  const isNegative = change.includes('-') || change.includes('No change');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${
          isPositive ? 'bg-green-100' : isNegative ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{value}</h3>
      <p className={`text-sm flex items-center gap-1 ${
        isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
      }`}>
        <span>{isPositive ? '↗' : isNegative ? '↘' : '→'}</span>
        {change}
      </p>
    </div>
  );
};

// ============================================
// LIST ITEM COMPONENT
// ============================================
const ListItem: React.FC<ListItemProps> = ({ rank, name, value, isLowStock }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-b-0">
    <div className="flex items-center gap-3">
      <span className="text-gray-500 font-medium">{rank}.</span>
      <span className="text-gray-800">{name}</span>
    </div>
    <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
      {value}
    </span>
  </div>
);

// ============================================
// FORECAST CHART COMPONENT
// ============================================
const ForecastChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Availability',
                data: [1200, 1400, 1250, 1500, 1800, 2100, 2300, 2100, 2000, 1800, 1500, 1300],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
              },
              {
                label: 'Requirement',
                data: [1300, 1500, 1300, 1600, 1900, 2000, 1900, 1800, 1700, 1500, 1300, 1250],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 2400,
                ticks: { stepSize: 600 },
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
              },
              x: { grid: { display: false } }
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Urea Availability vs. Requirement (Annual Forecast)
        </h2>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Urea (46% N)</option>
          <option>MOP</option>
          <option>DAP</option>
        </select>
      </div>
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Availability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Requirement</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PRODUCT LIST COMPONENT
// ============================================
const ProductList: React.FC<ProductListProps> = ({ title, items, isLowStock }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div>
      {items.map((item, idx) => (
         <ListItem 
          key={idx}
          rank={idx + 1}
          name={item.name}
          value={item.value}
          isLowStock={isLowStock}
        />
      ))}
    </div>
  </div>
);

// ============================================
// DATA
// ============================================
const topDemandProducts: ProductItem[] = [
  { name: 'MOP (Muriate of Potash)', value: '18,000 MT' },
  { name: 'Urea (46% N)', value: '15,000 MT' },
  { name: 'DAP (18-46-0)', value: '12,000 MT' },
  { name: 'NPK 20:20:0', value: '10,000 MT' },
  { name: 'NPK 10:26:26', value: '8,500 MT' },
];

const lowStockProducts: ProductItem[] = [
  { name: 'Calcium Nitrate', value: '2,500 MT' },
  { name: 'Zinc Sulphate', value: '3,000 MT' },
  { name: 'Gypsum', value: '4,000 MT' },
  { name: 'SSP (Single Superphosphate)', value: '5,500 MT' },
  { name: 'Ammonium Sulphate', value: '6,500 MT' },
];

// ============================================
// MAIN DASHBOARD
// ============================================
const FertilizerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Fertilizer Inventory Dashboard
        </h1>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Inventory Value" 
            value="₹28,850,000" 
            change="+4.5% vs. last month"
            icon={<InventoryIcon />}
          />
          <StatsCard 
            title="Critical Stock Items" 
            value="1" 
            change="-25% vs. last month"
            icon={<AlertIcon />}
          />
          <StatsCard 
            title="Total Products" 
            value="10" 
            change="+1.2% vs. last month"
            icon={<ProductsIcon />}
          />
          <StatsCard 
            title="Supply Deficit Items" 
            value="4" 
            change="No change vs. last month"
            icon={<DeficitIcon />}
          />
        </div>

        {/* Chart and Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ForecastChart />
          </div>

          <div className="space-y-6">
            <ProductList 
              title="Top 5 Most Required (Demand)"
              items={topDemandProducts}
              isLowStock={false}
            />
            <ProductList 
              title="Top 5 Least Available (Low Stock)"
              items={lowStockProducts}
              isLowStock={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerDashboard;