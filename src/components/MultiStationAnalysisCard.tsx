import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface MultiStationAnalysisCardProps {
  parameter: string;
  setParameter: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  section: string;
  setSection: (value: string) => void;
}

export function MultiStationAnalysisCard({
  parameter, setParameter, period, setPeriod,section, setSection,
}: MultiStationAnalysisCardProps) {
  const barData = [
    { name: "宝应站", permanganate: 1.7 },
    { name: "洪泽站", permanganate: 2.4 },
    { name: "金湖站", permanganate: 2 },
    { name: "泗阳站", permanganate: 2.3 },
    { name: "刘山站", permanganate: 4.3 },
    { name: "解台站", permanganate: 3 },
    { name: "皂河一站", permanganate: 1.9 },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl">水质监测指标趋势分析</h2>

      {/* Filter Row for Bar Chart */}
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <Select value={parameter} onValueChange={setParameter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="指标" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permanganate">高锰酸盐指数(mg/L)</SelectItem>
            <SelectItem value="oxygen">溶解氧(mg/L)</SelectItem>
            <SelectItem value="turbidity">浊度(NTU)</SelectItem>
            <SelectItem value="ammonia">氨氮(mg/L)</SelectItem>
            <SelectItem value="phosphorus">总磷(mg/L)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={section} onValueChange={setSection}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="区域" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全国</SelectItem>
            <SelectItem value="dongxian">东线</SelectItem>
            <SelectItem value="zhongxian">中线</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="day">近日</TabsTrigger>
            <TabsTrigger value="week">近周</TabsTrigger>
            <TabsTrigger value="month">近月</TabsTrigger>
            <TabsTrigger value="year">近年</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
            domain={[0, 10]}  
            stroke="#9ca3af"
            label={{
              value: "mg/L",
              angle: -90,
              position: "insideLeft",
              fill: "#6b7280",
            }}
             />
            <Tooltip />
            <Bar dataKey="permanganate" fill="#60a5fa" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
    </Card>
  );
}
