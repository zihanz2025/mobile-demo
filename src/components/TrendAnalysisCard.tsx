import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface TrendAnalysisCardProps {
  parameter: string;
  setParameter: (value: string) => void;
  indicator: string;
  setIndicator: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  site: string;
  setSite: (value: string) => void;
}

export function TrendAnalysisCard({
  parameter, setParameter, indicator, setIndicator, period, setPeriod,site, setSite,
}: TrendAnalysisCardProps) {
  const lineData = [
    { day: "周一", 水温: 22, 叶绿素a: 18 },
    { day: "周二", 水温: 21.5, 叶绿素a: 17 },
    { day: "周三", 水温: 21.3, 叶绿素a: 18.2 },
    { day: "周四", 水温: 21.4, 叶绿素a: 17.8 },
    { day: "周五", 水温: 21.6, 叶绿素a: 18.1 },
    { day: "周六", 水温: 21.7, 叶绿素a: 18.0 },
    { day: "周日", 水温: 21.8, 叶绿素a: 18.3 },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6 font-medium">水质多指标多断面趋势分析</h2>

      {/* Control Row */}
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <Select value={parameter} onValueChange={setParameter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="指标1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="waterTemp">水温(°C)</SelectItem>
            <SelectItem value="ph-value">pH值</SelectItem>
            <SelectItem value="dissolvedOxygen">溶解氧(mg/L)</SelectItem>
            <SelectItem value="turbidity">浊度(NTU)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={indicator} onValueChange={setIndicator}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="指标2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chlorophyll">叶绿素a(mg/L)</SelectItem>
            <SelectItem value="ammonia">氨氮(mg/L)</SelectItem>
            <SelectItem value="phosphorus">总磷(mg/L)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={site} onValueChange={setSite}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="断面" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="taocha">陶岔</SelectItem>
            <SelectItem value="laoyunhe">老运河</SelectItem>
            <SelectItem value="shahekou">沙河口</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="week">近周</TabsTrigger>
            <TabsTrigger value="month">近月</TabsTrigger>
            <TabsTrigger value="year">近年</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Line Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
                value: "叶绿素a (mg/L)",
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
              dataKey="叶绿素a"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
  );
}
