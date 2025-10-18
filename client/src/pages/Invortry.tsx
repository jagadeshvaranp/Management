import React, { useState } from "react";
export default function Invortry() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");

  const data = [
    {
      fertilizer: "Urea (46% N)",
      state: "Maharashtra",
      requirement: 15000,
      availability: 12000,
      gap: -3000,
      value: 3600000,
    },
    {
      fertilizer: "DAP (18-46-0)",
      state: "Punjab",
      requirement: 12000,
      availability: 15000,
      gap: 3000,
      value: 6750000,
    },
    {
      fertilizer: "NPK 10:26:26",
      state: "Uttar Pradesh",
      requirement: 8500,
      availability: 7000,
      gap: -1500,
      value: 3850000,
    },
    {
      fertilizer: "SSP (Single Superphosphate)",
      state: "Andhra Pradesh",
      requirement: 4000,
      availability: 5500,
      gap: 1500,
      value: 825000,
    },
    {
      fertilizer: "MOP (Muriate of Potash)",
      state: "Tamil Nadu",
      requirement: 18000,
      availability: 10000,
      gap: -8000,
      value: 3800000,
    },
    {
      fertilizer: "Zinc Sulphate",
      state: "Gujarat",
      requirement: 2500,
      availability: 3000,
      gap: 500,
      value: 2100000,
    },
    {
      fertilizer: "NPK 20:20:0",
      state: "Bihar",
      requirement: 10000,
      availability: 11000,
      gap: 1000,
      value: 4400000,
    },
    {
      fertilizer: "Ammonium Sulphate",
      state: "West Bengal",
      requirement: 6000,
      availability: 6500,
      gap: 500,
      value: 1625000,
    },
  ];
  const filtered = data.filter(
    (item) =>
      item.fertilizer.toLowerCase().includes(search.toLowerCase()) &&
      (state === "All States" || item.state === state)
  );
  return (
    <div className="p-8 bg-gray-100 min-h-screen ">
      <h1 className="text-2xl font-bold mb-6">
        Current Inventory & Supply Chain List
      </h1>

      {/* search */}
      <div className="bg-white p-5  rounded-2xl">
        <div className="bg-white  rounded mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Filter by Fertilizer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border px-4 py-2 rounded"
          />
            <label htmlFor="" className="mt-2 ml-3">Filter by State:</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Punjab</option>
            <option>Uttar Pradesh</option>
            <option>Andhra Pradesh</option>
            <option>Tamil Nadu</option>
            <option>Gujarat</option>
            <option>Bihar</option>
            <option>West Bengal</option>
          </select>
        </div>


        {/* content */}
          <div className="bg-white rounded overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="text-left p-4 font-semibold">FERTILIZER</th>
              <th className="text-left p-4 font-semibold">STATE</th>
              <th className="text-left p-4 font-semibold">REQUIREMENT (MT)</th>
              <th className="text-left p-4 font-semibold">AVAILABILITY (MT)</th>
              <th className="text-left p-4 font-semibold">SUPPLY GAP (MT)</th>
              <th className="text-left p-4 font-semibold">VALUE (INR)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{item.fertilizer}</td>
                <td className="p-4">{item.state}</td>
                <td className="p-4">{item.requirement.toLocaleString()}</td>
                <td className="p-4">{item.availability.toLocaleString()}</td>
                <td className="p-4">
                  <span className={item.gap < 0 ? ' text-red-700 px-3 py-3 rounded font-semibold' : ' text-green-700 px-3 py-1 rounded font-semibold'}>
                    {item.gap.toLocaleString()}
                  </span>
                </td>
                <td className="p-4 text-blue-600 font-semibold">
                  ₹{item.value.toLocaleString()}
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
