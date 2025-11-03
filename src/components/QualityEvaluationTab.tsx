import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function QualityEvaluationTab() {
  const [parameter, setParameter] = useState("waterTemp");
  const [indicator, setIndicator] = useState("chlorophyll");
  const [period, setPeriod] = useState("week");

  const lineData = [
    { day: "周一", 水温: 22, 叶绿素A: 18 },
    { day: "周二", 水温: 21.5, 叶绿素A: 17 },
    { day: "周三", 水温: 21.3, 叶绿素A: 18.2 },
    { day: "周四", 水温: 21.4, 叶绿素A: 17.8 },
    { day: "周五", 水温: 21.6, 叶绿素A: 18.1 },
    { day: "周六", 水温: 21.7, 叶绿素A: 18.0 },
    { day: "周日", 水温: 21.8, 叶绿素A: 18.3 },
  ];

  const barData = [
    { name: "宝应站", pH: 6.9 },
    { name: "洪泽站", pH: 7.2 },
    { name: "金湖站", pH: 7.4 },
    { name: "泗阳站", pH: 6.8 },
    { name: "刘山站", pH: 7.8 },
    { name: "解台站", pH: 7.0 },
    { name: "皂河一站", pH: 6.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <Card className="p-6">
        <h2 className="text-xl ">水质多指标多断面趋势分析</h2>

        {/* Control Row */}
        <div className="flex flex-wrap gap-3 items-center">
          <Select
            value={parameter}
            onValueChange={setParameter}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="指标1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="waterTemp">
                水温(°C)
              </SelectItem>
              <SelectItem value="dissolvedOxygen">
                溶解氧(mg/L)
              </SelectItem>
              <SelectItem value="turbidity">
                浊度(NTU)
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={indicator}
            onValueChange={setIndicator}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="指标2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chlorophyll">
                叶绿素A(mg/L)
              </SelectItem>
              <SelectItem value="ammonia">
                氨氮(mg/L)
              </SelectItem>
              <SelectItem value="phosphorus">
                总磷(mg/L)
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="周期" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">周</SelectItem>
              <SelectItem value="month">月</SelectItem>
              <SelectItem value="year">年</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Line Chart */}
        <Card className="p-4">
          <h3 className="text-blue-700 mb-3 font-medium">
            指标趋势
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <XAxis dataKey="day" />
              <YAxis
                yAxisId="left"
                label={{
                  value: "水温 (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "叶绿素A (mg/L)",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="水温"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="叶绿素A"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Stats section */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              水质断面监测列表
            </p>
            <p className="text-green-700 text-xl font-semibold">
              溶解氧：6.5 mg/L
            </p>
            <p className="text-xs text-gray-500">
              超过历史平均值，水体自净能力良好
            </p>
          </Card>
          <Card className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              水华面积监测变化
            </p>
            <p className="text-green-700 text-xl font-semibold">
              5%
            </p>
            <p className="text-xs text-gray-500">
              较上周同期 +12.3%（16.5 km²） | 较上月 -8.7%（20.4
              km²）
            </p>
          </Card>
        </div>
      </Card>

      <Card className="p-6">
        {/* Second Section: Multi-station Analysis */}
        <h2 className="text-xl ">水质监测指标趋势分析</h2>

        {/* Filter Row for Bar Chart */}
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <Select
            value={parameter}
            onValueChange={setParameter}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="pH值" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ph">pH值</SelectItem>
              <SelectItem value="oxygen">溶解氧</SelectItem>
              <SelectItem value="turbidity">浊度</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value="week" onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="day">近日</TabsTrigger>
              <TabsTrigger value="week">近周</TabsTrigger>
              <TabsTrigger value="month">近月</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Bar Chart */}
        <Card className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="pH" fill="#60a5fa" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Card>
    </div>
  );
}