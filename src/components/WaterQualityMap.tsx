import { useEffect, useState } from "react";
import { Card } from "./ui/card";
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

export function WaterQualityMap() {
  const [stations, setStations] = useState<MapLocation[]>([]);

  useEffect(() => {
    import("../data/stationinfo.json")
      .then((data) => {
        const stationInfo: StationInfo[] = data.station_info || [];

        const levelLabels: Record<string, string> = {
          "1": "I类",
          "2": "II类",
          "3": "III类",
          "4": "IV类",
          "5": "V类",
          "6": "劣V类",
        };

        // Map JSON → MapLocation
        const mapped: MapLocation[] = stationInfo
          .filter((s) => s.C_X && s.C_Y)
          .map((s, i) => ({
            id: s.MN_NAME + "_" + i,
            name: s.MN_NAME,
            lat: s.C_Y,
            lng: s.C_X,
            type: levelLabels[s.JC_LEVEL] || "未知",
            details: {
              "所属区域": s.STATION_SSQY =1? "东线" : "中线",
              "监测时间": s.MONITOR_TIME?.split("T")[0] || "-",
              "水质类别": levelLabels[s.JC_LEVEL] || "未知",
              "高锰酸盐指数 (mg/L)": s.PERMANGANATE_INDEX ?? "-",
              "pH": s.PH ?? "-",
              "溶解氧 (mg/L)": s.DISSOLVED_OXYGEN ?? "-",
              "氨氮 (mg/L)": s.AMMONIA_NITROGEN ?? "-",
              "总磷 (mg/L)": s.TOTAL_PHOSPHORUS ?? "-",
            },
          }));

        setStations(mapped);
      })
      .catch((err) => console.error("Failed to load station data:", err));
  }, []);

  return (
    <Card className="p-3">
      <h2 className=" text-xl font-medium">水质监测站点地图</h2>
      <InteractiveMapAmap
        locations={stations}
        zoom={10}
        height="calc(100vh - 250px)"
        showLegend={true}
        typeColors={{
          "I类": "#12B8F1",
          "II类": "#0E82F1",
          "III类": "#00EF4E",
          "IV类": "#FFE50C",
          "V类": "#FFAA00",
          "劣V类": "#FF1B1D",
          "未知": "#000000",
        }}
      />
    </Card>
  );
}
