import  { useState } from 'react';

// ============================================
// STEP 1: Define TypeScript Interfaces
// ============================================
interface StateData {
  stateName: string;
  netSupplyPosition: number;
  totalRequirement: number;
  netDeficitChange: string;
  requirementChange: string;
  topDeficits: {
    productName: string;
    deficit: number;
  }[];
}

// ============================================
// STEP 2: Sample Data for Different States
// ============================================
const stateDataMap: Record<string, StateData> = {
  Maharashtra: {
    stateName: 'Maharashtra',
    netSupplyPosition: -3000,
    totalRequirement: 15000,
    netDeficitChange: 'Net Deficit vs. last month',
    requirementChange: 'Annual Forecast vs. last month',
    topDeficits: [
      { productName: 'Urea (46% N)', deficit: -3000 },
      { productName: 'DAP (18-46-0)', deficit: -2500 },
      { productName: 'MOP (Muriate of Potash)', deficit: -1800 }
    ]
  },
  Karnataka: {
    stateName: 'Karnataka',
    netSupplyPosition: -2500,
    totalRequirement: 12000,
    netDeficitChange: 'Net Deficit vs. last month',
    requirementChange: 'Annual Forecast vs. last month',
    topDeficits: [
      { productName: 'DAP (18-46-0)', deficit: -2200 },
      { productName: 'Urea (46% N)', deficit: -1800 },
      { productName: 'NPK 20:20:0', deficit: -1500 }
    ]
  },
  Gujarat: {
    stateName: 'Gujarat',
    netSupplyPosition: -4200,
    totalRequirement: 18000,
    netDeficitChange: 'Net Deficit vs. last month',
    requirementChange: 'Annual Forecast vs. last month',
    topDeficits: [
      { productName: 'Urea (46% N)', deficit: -3500 },
      { productName: 'MOP (Muriate of Potash)', deficit: -2800 },
      { productName: 'DAP (18-46-0)', deficit: -2100 }
    ]
  },
  Punjab: {
    stateName: 'Punjab',
    netSupplyPosition: -5000,
    totalRequirement: 20000,
    netDeficitChange: 'Net Deficit vs. last month',
    requirementChange: 'Annual Forecast vs. last month',
    topDeficits: [
      { productName: 'Urea (46% N)', deficit: -4000 },
      { productName: 'DAP (18-46-0)', deficit: -3200 },
      { productName: 'NPK 10:26:26', deficit: -2500 }
    ]
  },
  'Tamil Nadu': {
    stateName: 'Tamil Nadu',
    netSupplyPosition: -3500,
    totalRequirement: 14000,
    netDeficitChange: 'Net Deficit vs. last month',
    requirementChange: 'Annual Forecast vs. last month',
    topDeficits: [
      { productName: 'Urea (46% N)', deficit: -2800 },
      { productName: 'DAP (18-46-0)', deficit: -2400 },
      { productName: 'Gypsum', deficit: -1900 }
    ]
  }
};

// ============================================
// STEP 3: Icon Com   ponents
// ============================================
const TrendDownIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// const SearchIcon = () => (
//   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// ============================================
// STEP 4: Stat Card Component
// ============================================
const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  isNegative 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  isNegative?: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className={`p-2 rounded-full ${isNegative ? 'bg-red-100' : 'bg-green-100'}`}>
        {icon}
      </div>
    </div>
    <div className={`text-3xl font-bold mb-2 ${isNegative ? 'text-red-600' : 'text-gray-900'}`}>
      {value}
    </div>
    <div className="flex items-center gap-1">
      <span className={`text-xs ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
        {isNegative ? '↘' : '↗'}
      </span>
      <span className="text-xs text-gray-500">{subtitle}</span>
    </div>
  </div>
);

// ============================================
// STEP 5: Deficit Item Component
// ============================================
const DeficitItem = ({ 
  productName, 
  deficit 
}: { 
  productName: string; 
  deficit: number;
}) => (
  <div className="flex items-center justify-between py-3 border-b last:border-b-0">
    <span className="text-gray-700 font-medium">{productName}</span>
    <span className="text-red-600 font-bold">{deficit.toLocaleString()} MT</span>
  </div>
);

// ============================================
// STEP 6: Main Dashboard Component
// ============================================
const StateAnalyticsDashboard = () => {
  // State to track selected state (default is Maharashtra)
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  
  // Get data for the currently selected state
  const currentData = stateDataMap[selectedState];
  
  // List of available states
  const states = Object.keys(stateDataMap);

  // Handler for state selection change
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          State-wise Supply Chain Analytics
        </h2>

        {/* State Selector Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select State for Detailed View to :
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 cursor-pointer"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Net Supply Position Card */}
          <StatCard
            title={`Net Supply Position in ${currentData.stateName}`}
            value={`${currentData.netSupplyPosition.toLocaleString()} MT`}
            subtitle={currentData.netDeficitChange}
            icon={<TrendDownIcon />}
            isNegative={true}
          />

          {/* Total State Requirement Card */}
          <StatCard
            title="Total State Requirement (MT)"
            value={`${currentData.totalRequirement.toLocaleString()} MT`}
            subtitle={currentData.requirementChange}
            icon={<GlobeIcon />}
            isNegative={false}
          />

          {/* Top 3 Critical Deficits Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Top 3 Critical Deficits
            </h3>
            <div className="space-y-1">
              {currentData.topDeficits.map((item, index) => (
                <DeficitItem
                  key={index}
                  productName={item.productName}
                  deficit={item.deficit}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StateAnalyticsDashboard;