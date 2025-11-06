import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function WaterQualityOverviewChart() {
  const data = [
    { date: "1月", compliance: 56 },
    { date: "2月", compliance: 58 },
    { date: "3月", compliance: 57 },
    { date: "4月", compliance: 59 },
    { date: "5月", compliance: 60 },
    { date: "6月", compliance: 59 },
    { date: "7月", compliance: 58 },
    { date: "8月", compliance: 59 },
    { date: "9月", compliance: 60 },
    { date: "10月", compliance: 59 }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6 font-medium">总体水质分析</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">水质站总数</p>
          <p className="text-3xl text-blue-600">148</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">达标率</p>
          <p className="text-3xl text-green-600">68%</p>
        </div>
      </div>

      {/* Progress Lines */}
      <div className="space-y-6">
        {/* 中线 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">中线（56个站点）</span>
            <span className="text-sm">达标率：80%</span>
          </div>
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 rounded-full"
              style={{ width: '80%' }}
            />
          </div>
        </div>

        {/* 东线 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">东线（92个站点）</span>
            <span className="text-sm">达标率：56%</span>
          </div>
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500 rounded-full"
              style={{ width: '56%' }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
