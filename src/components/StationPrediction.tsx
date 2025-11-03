import { useState } from "react";
import { Card } from "./ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

export function StationPrediction() {
  const [region, setRegion] = useState("沙沟桥");
  const [indicator, setIndicator] = useState("高锰酸盐指数(mg/L)");
  const [model, setModel] = useState("数字孪生中线机理模型");

  // Mock prediction data (you can later replace with actual fetched data)
  const data = [
    { date: "2025-09-26", value: 3.2 },
    { date: "2025-10-05", value: 3.0 },
    { date: "2025-10-12", value: 2.8 },
    { date: "2025-10-19", value: 2.6 },
    { date: "2025-10-26", value: 2.5 },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-medium">水质预测</h2>

        {/* Dropdown group */}
        <div className="flex flex-wrap gap-2">
          {/* 模型选择 */}
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="模型选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="数字孪生中线机理模型">数字孪生中线机理模型</SelectItem>
              <SelectItem value="中线数据驱动LSTM模型">中线数据驱动LSTM模型</SelectItem>
              <SelectItem value="藻类模型">藻类模型</SelectItem>
              <SelectItem value="水质系统短期水质预报模型">水质系统短期水质预报模型</SelectItem>
              <SelectItem value="水质水生态模型">水质水生态模型</SelectItem>
              <SelectItem value="中长期水质预报模型">中长期水质预报模型</SelectItem>
            </SelectContent>
          </Select>

          {/* 站点选择 */}
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="选择站点" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="沙沟桥">沙沟桥</SelectItem>
              <SelectItem value="刘山">刘山</SelectItem>
              <SelectItem value="团城湖">团城湖</SelectItem>
            </SelectContent>
          </Select>

          {/* 指标选择 */}
          <Select value={indicator} onValueChange={setIndicator}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="选择指标" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="高锰酸盐指数(mg/L)">高锰酸盐指数 (mg/L)</SelectItem>
              <SelectItem value="氨氮(mg/L)">氨氮 (mg/L)</SelectItem>
              <SelectItem value="总磷(mg/L)">总磷 (mg/L)</SelectItem>
              <SelectItem value="溶解氧(mg/L)">溶解氧 (mg/L)</SelectItem>
              <SelectItem value="pH值">pH值</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis
            stroke="#9ca3af"
            label={{
              value: indicator.includes("pH") ? "" : "mg/L",
              angle: -90,
              position: "insideLeft",
              fill: "#6b7280",
            }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
