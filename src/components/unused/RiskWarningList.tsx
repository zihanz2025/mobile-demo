import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertCircle, Clock, MapPin } from "lucide-react";

export interface RiskWarning {
  id: string;
  name: string;
  location: string;
  period: string;
  level: "Ⅰ级" | "Ⅱ级" | "Ⅲ级" | "Ⅳ级" | "Ⅴ级" | "Ⅵ级";
  description: string;
  coordinates: { lat: number; lng: number };
}

interface RiskWarningListProps {
  warnings: RiskWarning[];
  onSelect?: (warning: RiskWarning) => void;
}

export function RiskWarningList({ warnings, onSelect }: RiskWarningListProps) {
  const getLevelStyle = (level: string) => {
    if (["Ⅰ级", "Ⅱ级"].includes(level))
      return {
        color: "text-red-600",
        border: "border-l-red-500",
        badge: "destructive" as const,
      };
    if (["Ⅲ级", "Ⅳ级"].includes(level))
      return {
        color: "text-yellow-600",
        border: "border-l-yellow-500",
        badge: "default" as const,
      };
    return {
      color: "text-blue-600",
      border: "border-l-blue-500",
      badge: "secondary" as const,
    };
  };

  return (
    <div className="space-y-2">
      <div className="p-4">
        <h2 className="text-xl">风险提示</h2>
      </div>

      {warnings.length > 0 ? (
        warnings.map((w) => {
          const style = getLevelStyle(w.level);
          return (
            <Card
              key={w.id}
              className={`p-3 border-l-4 ${style.border} hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => onSelect?.(w)}
            >
              <div className="flex gap-2.5">
                <div className={`flex-shrink-0 ${style.color}`}>
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-medium text-sm">{w.name}</h4>
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 flex-shrink-0 "
                    >
                      {w.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {w.description}
                  </p>
                  <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{w.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>预计：{w.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <Card className="p-6 text-center text-sm text-gray-500">
          暂无风险数据
        </Card>
      )}
    </div>
  );
}
