import React, { useEffect, useRef } from "react";
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip);

const ForecastChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label: "Availability",
            data: [1200, 1400, 1250, 1500, 1700, 1800, 2000, 1950, 2050, 2150, 2250, 2350],
            borderColor: "#10b981",
            backgroundColor: "rgba(16,185,129,0.08)",
            tension: 0.35,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6
          },
          {
            label: "Requirement",
            data: [1300, 1500, 1300, 1600, 1750, 2000, 2300, 2100, 1900, 1700, 1400, 1250],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.08)",
            tension: 0.35,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 2400,
            ticks: { stepSize: 600 },
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: { grid: { display: false } }
        },
        interaction: { mode: "nearest", axis: "x", intersect: false }
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Urea Availability vs. Requirement (Annual Forecast)</h2>
        <select className="px-3 py-2 border rounded text-sm">
          <option>Urea (46% N)</option>
          <option>MOP</option>
          <option>DAP</option>
        </select>
      </div>
      <div className="h-80">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="flex justify-center gap-8 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded" />Availability</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded" />Requirement</div>
      </div>
    </div>
  );
};

export default ForecastChart;
