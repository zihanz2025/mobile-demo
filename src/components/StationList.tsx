import { useEffect, useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table } from "./ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

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

export function StationList() {
  const [stations, setStations] = useState<StationInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    import("../data/stationinfo.json")
      .then((data) => {
        if (data.station_info) setStations(data.station_info);
      })
      .catch((err) => console.error("Failed to load station data:", err));
  }, []);

  const getQualityBadge = (level: string) => {
    const configs: Record<string, string> = {
      "1": "bg-sky-100 text-blue-800",
      "2": "bg-blue-100 text-blue-800",
      "3": "bg-green-100 text-green-800",
      "4": "bg-yellow-100 text-yellow-800",
      "5": "bg-orange-100 text-orange-800",
      "6": "bg-red-100 text-red-800",
    };
    const labels: Record<string, string> = {
      "1": "I类",
      "2": "II类",
      "3": "III类",
      "4": "IV类",
      "5": "V类",
      "6": "劣V类",
    };
    return (
      <Badge className={configs[level] || "bg-gray-100 text-gray-700"}>
        {labels[level] || "未知"}
      </Badge>
    );
  };

  // ✅ Filter stations by search term (case-insensitive)
  const filteredStations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return stations;
    return stations.filter(
      (s) =>
        s.MN_NAME.toLowerCase().includes(term) ||
        (s.JC_LEVEL && s.JC_LEVEL.toString().includes(term))
    );
  }, [stations, searchTerm]);

  return (
    <Card className="h-[480px] flex flex-col min-h-0">
      {/* Header + Search */}
      <div className="mt-6 ml-6 mr-6 flex items-center justify-between flex-shrink-0">
        <h2 className="text-xl font-medium">水质站监测数据</h2>

        <div className="relative w-48">
          <Search className="absolute left-2.5 top-5 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索站点"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-6 h-9 text-sm"
          />
        </div>
      </div>

      {/* ✅ Scrollable Table */}
      <div className="p-1 flex-1 min-h-0 overflow-y-auto">
        <Table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left min-w-[160px]">站点名称</th>
              <th className="px-3 py-3 text-left whitespace-nowrap min-w-[160px]">水质<br />类别</th>
              <th className="px-6 py-3 text-left whitespace-nowrap min-w-[160px]">高锰酸盐<br />指数(mg/L)</th>
              <th className="px-6 py-3 text-left whitespace-nowrap min-w-[160px]">氨氮<br />(mg/L)</th>
              <th className="px-6 py-3 text-left whitespace-nowrap min-w-[160px]">总磷<br />(mg/L)</th>
              <th className="px-6 py-3 text-left whitespace-nowrap min-w-[160px]">pH值</th>
              <th className="px-6 py-3 text-left whitespace-nowrap min-w-[160px]">溶解氧<br />(mg/L)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStations.length > 0 ? (
              filteredStations.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 whitespace-nowrap min-w-[160px] font-medium">
                    {s.MN_NAME}
                  </td>
                  <td className="px-3 py-3">{getQualityBadge(s.JC_LEVEL)}</td>
                  <td className="px-6 py-3">{s.PERMANGANATE_INDEX ?? "-"}</td>
                  <td className="px-6 py-3">{s.AMMONIA_NITROGEN ?? "-"}</td>
                  <td className="px-6 py-3">{s.TOTAL_PHOSPHORUS ?? "-"}</td>
                  <td className="px-6 py-3">{s.PH ?? "-"}</td>
                  <td className="px-6 py-3">{s.DISSOLVED_OXYGEN ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  没有找到匹配的站点
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
