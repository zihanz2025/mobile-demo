import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MapPin, BarChart2 } from "lucide-react";
import { WaterQualityOverviewChart } from "./WaterQualityOverviewChart";
import { WaterQualityDistribution } from "./WaterQualityDistribution";
import { StationList } from "./StationList";
import { StationTrendChart } from "./StationTrendChart";
import { StationPrediction } from "./StationPrediction";
import { WaterQualityMap } from "./WaterQualityMap";
import { InteractiveMapAmap, MapLocation } from "./InteractiveMapAmap";

interface StationInfo {
  MN_NAME: string;
  C_X: number;
  C_Y: number;
  STATION_SSQY: string;
  MONITOR_TIME: string;
  JC_LEVEL: string;
  PH: number;
  DISSOLVED_OXYGEN: number;
  PERMANGANATE_INDEX: number;
  AMMONIA_NITROGEN: number;
  TOTAL_PHOSPHORUS: number | null;
}

export function WaterQualityTab() {
  const [viewMode, setViewMode] = useState<"data" | "map" |"list">("data");

  

  const stations: MapLocation[] = [
    {
      id: "1",
      name: "府城南监测站",
      lng: 113.19,
      lat: 35.18,
      type: "中线",
      status: "normal",
      details: {
        "水质类别": "Ⅲ类",
        "pH值": "7.2",
        "溶解氧": "6.8 mg/L",
      },
    },
    {
      id: "2",
      name: "中易水监测站",
      lng: 115.43,
      lat: 39.27,
      type: "中线",
      status: "normal",
      details: {
        "水质类别": "Ⅱ类",
        "pH值": "7.5",
        "溶解氧": "7.2 mg/L",
      },
    },
    {
      id: "3",
      name: "姜沟监测站",
      lng: 112.46,
      lat: 33.00,
      type: "中线",
      status: "warning",
      details: {
        "水质类别": "Ⅳ类",
        "pH值": "7.0",
        "溶解氧": "5.5 mg/L",
      },
    },
    {
      id: "4",
      name: "喻屯国控站",
      lng: 116.57,
      lat: 35.20,
      type: "中线",
      status: "normal",
      details: {
        "水质类别": "Ⅲ类",
        "pH值": "7.3",
        "溶解氧": "6.5 mg/L",
      },
    },
    {
      id: "5",
      name: "团城湖监测站",
      lng: 116.26823700,
      lat: 39.94567200,
      type: "东线",
      status: "normal",
      details: {
        "水质类别": "Ⅲ类",
        "pH值": "7.4",
        "溶解氧": "6.9 mg/L",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header + toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "data" ? "blue" : "outline"}
            onClick={() => setViewMode("data")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            数据总览
          </Button>
          <Button
            variant={viewMode === "list" ? "blue" : "outline"}
            onClick={() => setViewMode("list")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <MapPin className="w-3.5 h-3.5" />
            测站列表
          </Button>
          <Button
            variant={viewMode === "map" ? "blue" : "outline"}
            onClick={() => setViewMode("map")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <MapPin className="w-3.5 h-3.5" />
            地图视图
          </Button>
        </div>
      </div>

      {/* Conditional content */}
      {viewMode === "data" ? (
        <>
          <WaterQualityOverviewChart />
          <WaterQualityDistribution />
          <StationTrendChart />
          <StationPrediction />
        </>
      ) : (viewMode === "list" ? (
        <StationList />
      ) : (
        
        <WaterQualityMap />

      ))}
    </div>
  );
}
