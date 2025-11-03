import { Card } from "./ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function PollutionSourceDistribution() {
  const data = [
    { name: "I级风险单元", value: 15, percentage: 25 },
    { name: "II级风险单元", value: 35, percentage: 25 },
    { name: "III级风险单元", value: 38, percentage: 13 },
    { name: "IV级风险单元", value: 28, percentage: 25 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#fbbf24", "#f59e0b"];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6">风险单元统计</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Pie Chart */}
        <div className="relative w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70} // makes it hollow
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
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

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-gray-800">
              {total}
            </span>
            <span className="text-sm text-gray-500">总数</span>
          </div>
        </div>

        {/* Legend with details */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="text-sm">
                <span>{item.name}</span>
                <span className="text-gray-500 ml-2">
                  {item.value}站 ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}