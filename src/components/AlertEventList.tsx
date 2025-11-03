import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Upload, Plus, Send, Filter } from "lucide-react";

export interface AlertEvent {
  id: string;
  name: string;
  category: "气象" | "水质" | "危化品运输";
  time: string;
  severity: "red" | "orange" | "yellow" | "blue";
  description: string;
  status: "active" | "finished";
  resolvedTime?: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  details?: {
    parameters?: {
      name: string;
      value: string;
      unit: string;
    }[];
    affected_area?: string;
    response_actions?: string[];
  };
}

interface AlertEventListProps {
  onEventClick: (event: AlertEvent) => void;
}

export function AlertEventList({
  onEventClick,
}: AlertEventListProps) {
  const events: AlertEvent[] = [
    {
      id: "1",
      name: "强降雨引发地表径流风险",
      category: "气象",
      time: "2025-10-29 14:30",
      severity: "red",
      status: "active",
      description:
        "未来24小时预计强降雨，存在局部泥石流与径流污染风险。",
      location: {
        name: "豫北山区",
        lat: 34.5678,
        lng: 113.1234,
      },
    },
    {
      id: "2",
      name: "溶解氧浓度偏低",
      category: "水质",
      time: "2025-10-29 12:15",
      severity: "orange",
      status: "active",
      description: "溶解氧浓度为 5.8 mg/L，接近临界阈值。",
      location: {
        name: "东线B3站点",
        lat: 35.1234,
        lng: 118.5678,
      },
    },
    {
      id: "3",
      name: "氨氮含量轻微升高",
      category: "水质",
      time: "2025-10-29 10:45",
      severity: "yellow",
      status: "active",
      description: "氨氮含量略高于正常值，建议持续观测。",
      location: {
        name: "中线C5站点",
        lat: 36.2345,
        lng: 114.6789,
      },
    },
    {
      id: "4",
      name: "危化品运输车辆泄漏风险",
      category: "危化品运输",
      time: "2025-10-29 09:00",
      severity: "orange",
      status: "active",
      description:
        "高速路段运输车辆监测异常，疑似小范围泄漏风险。",
      location: {
        name: "连霍高速郑州段",
        lat: 34.9,
        lng: 113.65,
      },
    },
    {
      id: "5",
      name: "危化品运输路线拥堵",
      category: "危化品运输",
      time: "2025-10-28 17:20",
      severity: "blue",
      status: "active",
      description: "运输车辆滞留3小时，需协调交通疏导。",
      location: {
        name: "京港澳高速漯河段",
        lat: 33.58,
        lng: 113.98,
      },
    },
  ];

  const activeEvents = events.filter(
    (e) => e.status === "active",
  );
  const finishedEvents = events.filter(
    (e) => e.status === "finished",
  );
  const [filter, setFilter] = useState("time");

  // Count categories
  const categoryCounts = {
    气象: activeEvents.filter((e) => e.category === "气象")
      .length,
    水质: activeEvents.filter((e) => e.category === "水质")
      .length,
    危化品运输: activeEvents.filter(
      (e) => e.category === "危化品运输",
    ).length,
  };

  const total =
    categoryCounts.气象 +
      categoryCounts.水质 +
      categoryCounts.危化品运输 || 1;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "red":
        return {
          icon: <AlertTriangle className="w-full h-full" />,
          badgeVariant: "destructive" as const,
          badgeText: "红色预警",
          iconColor: "text-red-600",
          borderColor: "border-l-red-500",
          badgeClass:
            "bg-red-100 text-red-700 border border-red-200",
        };
      case "orange":
        return {
          icon: <AlertCircle className="w-full h-full" />,
          badgeVariant: "default" as const,
          badgeText: "橙色预警",
          iconColor: "text-orange-600",
          borderColor: "border-l-orange-500",
          badgeClass:
            "bg-orange-100 text-orange-700 border border-orange-200",
        };
      case "yellow":
        return {
          icon: <Info className="w-full h-full" />,
          badgeVariant: "secondary" as const,
          badgeText: "黄色预警",
          iconColor: "text-yellow-600",
          borderColor: "border-l-yellow-400",
          badgeClass:
            "bg-yellow-100 text-yellow-700 border border-yellow-200",
        };
      case "blue":
        return {
          icon: <Info className="w-full h-full" />,
          badgeVariant: "outline" as const,
          badgeText: "蓝色预警",
          iconColor: "text-blue-600",
          borderColor: "border-l-blue-500",
          badgeClass:
            "bg-blue-100 text-blue-700 border border-blue-200",
        };
      default:
        return {
          icon: <Info className="w-full h-full" />,
          badgeVariant: "outline" as const,
          badgeText: "未知",
          iconColor: "text-gray-600",
          borderColor: "border-l-gray-500",
        };
    }
  };

  const renderEventCard = (event: AlertEvent) => {
    const config = getSeverityConfig(event.severity);
    const isFinished = event.status === "finished";
    return (
      <Card
        key={event.id}
        className={`p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4 ${config.borderColor} ${isFinished ? "opacity-75" : ""}`}
        onClick={() => onEventClick(event)}
      >
        <div className="flex gap-3">
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            <div className="w-4 h-4">{config.icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="flex-1 text-sm font-medium">{event.name}</h4>
              <Badge
                variant={config.badgeVariant}
                className={`${config.badgeClass || ""} text-xs px-1.5 py-0.5 flex-shrink-0`}
              >
                {config.badgeText}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {event.description}
            </p>
            <div className="text-xs text-gray-500 space-y-0.5">
              <p>📍 {event.location.name}</p>
              <p>📅 {event.time}</p>
              <p>分类：{event.category}</p>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // Form dialog state
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "水质污染",
    location: "",
    description: "",
    files: [] as File[],
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = () => {
    alert(
      `上报成功！\n类型：${formData.type}\n地点：${formData.location}\n描述：${formData.description}\n附件数：${formData.files.length}`,
    );
    setFormData({
      type: "水质污染",
      location: "",
      description: "",
      files: [],
    });
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Header and Report Button */}
      <div className="flex items-center justify-between mb-3">
        <div className="p-4">
        <h2 className="text-xl">应急预警事件</h2>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="flex items-center gap-1 h-8 text-xs mr-4"
              variant="blue"
            >
              <Plus className="w-3.5 h-3.5" /> 上报事件
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>上报应急事件</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="type">事件类型</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                  className="border rounded-md w-full px-3 py-2 mt-1"
                >
                  <option value="气象">气象</option>
                  <option value="水质">水质</option>
                  <option value="危化品运输">危化品运输</option>
                </select>
              </div>

              <div>
                <Label htmlFor="location">发生地点</Label>
                <Input
                  id="location"
                  placeholder="请输入地点..."
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">现场描述</Label>
                <Textarea
                  id="description"
                  placeholder="请输入描述..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="files"
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> 上传附件
                </Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                {formData.files.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    已选择 {formData.files.length} 个文件
                  </p>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full flex items-center gap-1 mt-2"
                variant="blue"
              >
                <Send className="w-4 h-4" /> 提交上报
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Section */}
      <div className="p-4">
        <div className="text-md mb-2">
          当前活跃事件总数：
          <span className="font-semibold text-gray-800">
            {activeEvents.length}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-sm text-gray-600 mb-1">
              红色预警
            </p>
            <p className="text-3xl font-semibold text-red-600">
              {
                activeEvents.filter((e) => e.severity === "red")
                  .length
              }
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-gray-600 mb-1">
              橙色预警
            </p>
            <p className="text-3xl font-semibold text-orange-500">
              {
                activeEvents.filter(
                  (e) => e.severity === "orange",
                ).length
              }
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <p className="text-sm text-gray-600 mb-1">
              黄色预警
            </p>
            <p className="text-3xl font-semibold text-yellow-500">
              {
                activeEvents.filter(
                  (e) => e.severity === "yellow",
                ).length
              }
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">
              蓝色预警
            </p>
            <p className="text-3xl font-semibold text-blue-500">
              {
                activeEvents.filter(
                  (e) => e.severity === "blue",
                ).length
              }
            </p>
          </div>
        </div>

        {/* Category Distribution Bar */}
        <div className="mt-6">
          <p className="text-md  mb-2">
            事件类型分布
          </p>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>气象 {categoryCounts.气象}</span>
            <span>水质 {categoryCounts.水质}</span>
            <span>危化品运输 {categoryCounts.危化品运输}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
            <div
              className="bg-sky-400 h-full"
              style={{
                width: `${(categoryCounts.气象 / total) * 100}%`,
              }}
            />
            <div
              className="bg-green-500 h-full"
              style={{
                width: `${(categoryCounts.水质 / total) * 100}%`,
              }}
            />
            <div
              className="bg-amber-500 h-full"
              style={{
                width: `${(categoryCounts.危化品运输 / total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            活跃事件 ({activeEvents.length})
          </TabsTrigger>
          <TabsTrigger value="finished">
            已完成 ({finishedEvents.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-2 flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border rounded-md px-2 py-1"
          >
            <option value="time">按时间（最新）</option>
            <option value="location">按地点距离</option>
            <option value="severity">按预警等级</option>
          </select>
        </div>

        <TabsContent value="active" className="space-y-3 mt-4">
          {activeEvents.length > 0 ? (
            activeEvents.map(renderEventCard)
          ) : (
            <Card className="p-8 text-center text-gray-500">
              暂无活跃预警事件
            </Card>
          )}
        </TabsContent>

        <TabsContent
          value="finished"
          className="space-y-3 mt-4"
        >
          {finishedEvents.length > 0 ? (
            finishedEvents.map(renderEventCard)
          ) : (
            <Card className="p-8 text-center text-gray-500">
              暂无已完成事件
            </Card>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}