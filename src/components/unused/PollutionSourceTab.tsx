import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Factory,
  Droplets,
  Building2,
  MapPin,
  BarChart2,
} from "lucide-react";
import { PollutionSourceDistribution } from "./PollutionSourceDistribution";
import { RiskWarningList, RiskWarning } from "../RiskWarningList";
import { InteractiveMapAmap, MapLocation } from "../InteractiveMapAmap";

export function PollutionSourceTab() {
  const [viewMode, setViewMode] = useState<"data" | "map">("data");

  // === Risk warning data (relocated near Beijing area) ===
  const warnings: RiskWarning[] = [
    {
      id: "1",
      name: "航运船舶水上溢油风险",
      location: "京杭运河北段",
      period: "2025-10-25 至 2025-10-26",
      level: "Ⅵ级",
      description: "受强风与航道施工影响，存在局部水面溢油风险",
      coordinates: { lat: 39.935, lng: 116.415 },
    },
    {
      id: "2",
      name: "工业废水排放异常风险",
      location: "通州区工业园监测点",
      period: "2025-10-29",
      level: "Ⅳ级",
      description: "化学需氧量接近预警阈值，可能出现短期超标风险",
      coordinates: { lat: 39.78, lng: 116.55 },
    },
    {
      id: "3",
      name: "雨后地表径流污染风险",
      location: "大兴南部区域",
      period: "2025-10-30 至 2025-11-01",
      level: "Ⅴ级",
      description: "强降雨可能导致农田径流携带氮磷物质进入河道",
      coordinates: { lat: 39.63, lng: 116.35 },
    },
  ];

  // === Card summary data ===
  const sources = [
    {
      id: "1",
      name: "污染源",
      count: 38,
      icon: <Factory className="w-full h-full" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "2",
      name: "跨渠危险品运输桥梁",
      count: 119,
      icon: <Droplets className="w-full h-full" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "3",
      name: "跨渠石油天然气管线",
      count: 230,
      icon: <Building2 className="w-full h-full" />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "4",
      name: "地下水内排段",
      count: 195,
      icon: <Building2 className="w-full h-full" />,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  // === Shared map data (management, storage, pollution, risk) ===
  const mapLocations: MapLocation[] = useMemo(() => {
    const managementAndStorage: MapLocation[] = [
      {
        id: "m1",
        name: "管理处A",
        lat: 39.921,
        lng: 116.39,
        type: "管理处",
        details: { 人员: "12人", 联系电话: "010-12345678" },
      },
      {
        id: "m2",
        name: "管理处B",
        lat: 39.731,
        lng: 116.22,
        type: "管理处",
        details: { 人员: "8人", 联系电话: "010-87654321" },
      },
      {
        id: "w1",
        name: "应急物资仓库1",
        lat: 39.851,
        lng: 116.35,
        type: "应急物资仓库",
        details: { 物资储量: "充足", 负责人: "张三" },
      },
      {
        id: "w2",
        name: "应急物资仓库2",
        lat: 39.641,
        lng: 116.52,
        type: "应急物资仓库",
        details: { 物资储量: "充足", 负责人: "李四" },
      },
    ];

    const pollutionSources: MapLocation[] = [
      {
        id: "p1",
        name: "化工厂A",
        lat: 39.92,
        lng: 116.45,
        type: "污染源",
        details: { 风险等级: "中", 主要污染物: "COD" },
      },
      {
        id: "p2",
        name: "印染厂B",
        lat: 39.87,
        lng: 116.32,
        type: "污染源",
        details: { 风险等级: "高", 主要污染物: "重金属" },
      },
      {
        id: "p3",
        name: "造纸厂C",
        lat: 39.78,
        lng: 116.58,
        type: "污染源",
        details: { 风险等级: "低", 主要污染物: "氨氮" },
      },
    ];

    const riskWarnings: MapLocation[] = warnings.map((w) => ({
      id: w.id,
      name: w.name,
      lat: w.coordinates.lat,
      lng: w.coordinates.lng,
      type: "风险源",
      details: {
        风险等级: w.level,
        位置: w.location,
        预计时间: w.period,
      },
    }));

    return [...managementAndStorage, ...pollutionSources, ...riskWarnings];
  }, [warnings]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "data" ? "blue" : "outline"}
            onClick={() => setViewMode("data")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <BarChart2 className="w-3.5 h-3.5" /> 数据视图
          </Button>
          <Button
            variant={viewMode === "map" ? "blue" : "outline"}
            onClick={() => setViewMode("map")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <MapPin className="w-3.5 h-3.5" /> 地图视图
          </Button>
        </div>
      </div>

      {viewMode === "data" ? (
        <>
          {/* Overview cards */}
          <Card className="p-6">
            <h2 className="text-xl">风险源管理</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sources.map((source) => (
                <div key={source.id} className="p-4 rounded-lg bg-gray-50 flex flex-col items-start">
                  {/* Colored icon box */}
                   <div
                  className={`p-2 rounded-lg ${source.color} inline-block mb-2`}
                >
                  <div className="w-6 h-6">{source.icon}</div>
                </div>
                    {/* Name + count */}
                    <h3 className="text-md text-gray-700 mb-1">{source.name}</h3>
                    <p className="text-xl text-gray-900">{source.count}</p>
                    </div>
                  ))}
            </div>
          </Card>



          <PollutionSourceDistribution />
          <RiskWarningList warnings={warnings} />
        </>
      ) : (
        // Map view
        <Card className="p-3">
          <h2 className="mb-3 text-sm font-medium">风险源与管理处分布地图</h2>
          <InteractiveMapAmap
            locations={mapLocations}
            zoom={10}
            height="calc(100vh - 250px)"
            showLegend={true}
            typeColors={{
    "管理处": "#10b981",
    "应急物资仓库": "#3b82f6",
    "污染源": "#fbbf24",
    "风险源": "#ef4444",
  }}
          />
        </Card>
      )}
    </div>
  );
}
