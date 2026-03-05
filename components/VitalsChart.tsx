"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface VitalsChartProps {
  patient: any;
}

export default function VitalsChart({ patient }: VitalsChartProps) {
  // Prepare data for charts - combine vital signs by time
  const prepareChartData = () => {
    const hrData = patient.vitals.find((v: any) => v.type === "HR")?.data || [];
    const sbpData =
      patient.vitals.find((v: any) => v.type === "SBP")?.data || [];
    const tempData =
      patient.vitals.find((v: any) => v.type === "TEMP")?.data || [];

    // Create time-aligned data points
    const dataMap = new Map();

    hrData.forEach((point: any) => {
      const time = new Date(point.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      dataMap.set(point.time, { time, HR: point.value });
    });

    sbpData.forEach((point: any) => {
      const time = new Date(point.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const existing = dataMap.get(point.time) || { time };
      dataMap.set(point.time, { ...existing, SBP: point.value });
    });

    tempData.forEach((point: any) => {
      const time = new Date(point.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const existing = dataMap.get(point.time) || { time };
      dataMap.set(point.time, { ...existing, TEMP: point.value });
    });

    return Array.from(dataMap.values());
  };

  const chartData = prepareChartData();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">Vitals Trend</h2>
      </div>

      <div className="space-y-6">
        {/* Heart Rate & BP Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Heart Rate & Blood Pressure
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="HR"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="HR (bpm)"
              />
              <Line
                type="monotone"
                dataKey="SBP"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="SBP (mmHg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Temperature Trend
          </h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
              />
              <YAxis
                domain={[35, 40]}
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="TEMP"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Temp (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

