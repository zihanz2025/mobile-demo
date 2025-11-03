import { useState, useMemo } from "react";
import { Card } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface Station {
  id: string;
  name: string;
}

interface ChartData {
  date: string;
  value: number;
}

export function StationTrendChart() {
  const stations: Station[] = [
    { id: "1", name: "陶岔" },
    { id: "2", name: "漳河北" },
    { id: "3", name: "南营村" },
    { id: "4", name: "西黑山" },
    { id: "5", name: "王庆坨" },
    { id: "6", name: "天津外环河" },
    { id: "7", name: "惠南庄" },
  ];

  const attributes = [
    { key: "permanganate", label: "高锰酸盐指数 (mg/L)" },
    { key: "ammonia", label: "氨氮 (mg/L)" },
    { key: "phosphorus", label: "总磷 (mg/L)" },
  ];

  const [selectedStation, setSelectedStation] = useState(stations[0].id);
  const [selectedAttribute, setSelectedAttribute] = useState("permanganate");
  const [range, setRange] = useState<7 | 30>(7);

  const data: ChartData[] = useMemo(() => {
    const days = range;
    const now = new Date();
    const attrMinMax: Record<string, [number, number]> = {
      permanganate: [6.5, 8.5],
      ammonia: [0.05, 1.2],
      phosphorus: [0.03, 0.3],
    };
    const [min, max] = attrMinMax[selectedAttribute];
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (days - 1 - i));
      const dateStr = `${d.getMonth() + 1}-${d.getDate()}`;
      const value =
        min +
        Math.random() * (max - min) * (selectedStation.length / 10);
      return { date: dateStr, value: Number(value.toFixed(2)) };
    });
  }, [selectedAttribute, range, selectedStation]);

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6 font-medium">水质指标趋势分析</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">监测站点</label>
          <Select value={selectedStation} onValueChange={setSelectedStation}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="选择站点" />
            </SelectTrigger>
            <SelectContent>
              {stations.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-gray-600">监测指标</label>
          <Select value={selectedAttribute} onValueChange={setSelectedAttribute}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="选择指标" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((a) => (
                <SelectItem key={a.key} value={a.key}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-gray-600">时间范围</label>
          <div className="flex gap-2">
            <button
              onClick={() => setRange(7)}
              className={`px-3 py-2 rounded-md border ${
                range === 7
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              最近7天
            </button>
            <button
              onClick={() => setRange(30)}
              className={`px-3 py-2 rounded-md border ${
                range === 30
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              最近30天
            </button>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
