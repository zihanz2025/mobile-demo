import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MapPin, BarChart2, List } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"data" | "map" |"list">("map");

  return (
    <div className="space-y-4">
      {/* Header + toggle */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant={viewMode === "map" ? "blue" : "outline"}
            onClick={() => setViewMode("map")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <MapPin className="w-3.5 h-3.5" />
            测站地图
          </Button>
          <Button
            variant={viewMode === "list" ? "blue" : "outline"}
            onClick={() => setViewMode("list")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <List className="w-3.5 h-3.5" />
            测站列表
          </Button>
          <Button
            variant={viewMode === "data" ? "blue" : "outline"}
            onClick={() => setViewMode("data")}
            className="flex items-center gap-1 h-8 text-xs px-3"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            数据概览
          </Button>
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
