import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface StationInfo {
  JC_LEVEL: string;
}

export function WaterQualityDistribution() {
  const [data, setData] = useState<
    { name: string; value: number; percentage: number }[]
  >([]);

  const COLORS = [
    "#10b981", // I类
    "#3b82f6", // II类
    "#fbbf24", // III类
    "#f59e0b", // IV类
    "#ef4444", // V类
    "#991b1b", // 劣V类
  ];

  const levelLabels: Record<string, string> = {
    "1": "I类",
    "2": "II类",
    "3": "III类",
    "4": "IV类",
    "5": "V类",
    "6": "劣V类",
  };

  useEffect(() => {
    import("../data/stationinfo.json")
      .then((dataset) => {
        const stations: StationInfo[] = dataset.station_info || [];

        // Count how many stations per JC_LEVEL
        const counts: Record<string, number> = {};
        stations.forEach((s) => {
          const level = s.JC_LEVEL?.toString() || "未知";
          counts[level] = (counts[level] || 0) + 1;
        });

        const total = stations.length || 1;
        const processed = Object.keys(levelLabels).map((key) => ({
          name: levelLabels[key],
          value: counts[key] || 0,
          percentage: +(((counts[key] || 0) / total) * 100).toFixed(2),
        }));

        setData(processed);
      })
      .catch((err) =>
        console.error("Failed to load station data:", err)
      );
  }, []);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6 font-medium">总体水质概览</h2>

      {data.length > 0 ? (
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Pie Chart */}
          <div className="flex-shrink-0">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 flex-1">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>
                  {item.name}
                  <span className="text-gray-500 ml-2">
                    {item.value}站 ({item.percentage}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">正在加载数据...</p>
      )}
    </Card>
  );
}
