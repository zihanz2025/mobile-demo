import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  ArrowLeft,
  MapPin,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  Upload,
  FileText,
  Image as ImageIcon,
  Plus,
  CheckCircle,
  Send,
  Users,
  File,
} from "lucide-react";
import { AlertEvent } from "./AlertEventList";
import { InteractiveMapAmap } from "./InteractiveMapAmap";

interface AlertEventDetailProps {
  event: AlertEvent;
  onBack: () => void;
}

export function AlertEventDetail({ event, onBack }: AlertEventDetailProps) {
  const [viewMode, setViewMode] = useState<"info" | "map">("info");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);

  // Mock past uploads
  const [pastUploads, setPastUploads] = useState([
    {
      id: 1,
      time: "2025-10-28 15:20",
      text: "已完成现场初步勘查，发现泥浆入水现象。",
      files: ["photo1.jpg", "现场报告.pdf"],
    },
    {
      id: 2,
      time: "2025-10-29 09:30",
      text: "采样点水质数据更新，氨氮略有下降。",
      files: ["sampling-data.xlsx"],
    },
  ]);

  const handleMarkComplete = () => {
    alert(`事件 "${event.name}" 已标记为完成！`);
  };

  const handleSendAlert = () => {
    alert("预警通知已发送给选定的联系人！");
    setNotifyDialogOpen(false);
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "red":
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          badgeText: "红色预警",
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
        };
      case "orange":
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          badgeText: "橙色预警",
          iconColor: "text-orange-600",
          bgColor: "bg-orange-50",
        };
      case "yellow":
        return {
          icon: <Info className="w-6 h-6" />,
          badgeText: "黄色预警",
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
        };
      case "blue":
        return {
          icon: <Info className="w-6 h-6" />,
          badgeText: "蓝色预警",
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
        };
      default:
        return {
          icon: <Info className="w-6 h-6" />,
          badgeText: "未知级别",
          iconColor: "text-gray-600",
          bgColor: "bg-gray-50",
        };
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "气象":
        return "bg-sky-100 text-sky-700 border border-sky-200";
      case "水质":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "危化品运输":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const config = getSeverityConfig(event.severity);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setUploadedFiles(Array.from(e.target.files));
  };

  const handleSubmitInfo = () => {
    alert(
      `提交成功！\n说明: ${additionalInfo}\n数据: ${dataInput}\n文件: ${uploadedFiles.length}个`
    );

    setPastUploads([
      ...pastUploads,
      {
        id: pastUploads.length + 1,
        time: new Date().toLocaleString(),
        text: additionalInfo || "(无文字说明)",
        files: uploadedFiles.map((f) => f.name),
      },
    ]);

    setAdditionalInfo("");
    setDataInput("");
    setUploadedFiles([]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-base font-medium">预警事件详情</h2>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "info" ? "blue" : "outline"}
            size="sm"
            onClick={() => setViewMode("info")}
            className="h-8 text-xs px-3"
          >
            信息
          </Button>
          <Button
            variant={viewMode === "map" ? "blue" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="h-8 text-xs px-3"
          >
            地图
          </Button>
        </div>
      </div>

      {/* Conditional content */}
      {viewMode === "info" ? (
        <>
          {/* Overview */}
          <Card className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={`${config.iconColor} flex-shrink-0`}>
                {event.status === "finished" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  config.icon
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-medium">{event.name}</h3>
                  <div className="flex gap-1 flex-shrink-0">
                    <Badge
                      className={`${getCategoryStyle(event.category)} text-xs px-1.5 py-0.5`}
                    >
                      {event.category}
                    </Badge>
                    <Badge
                      className={`${config.bgColor} text-xs font-medium px-1.5 py-0.5`}
                    >
                      {config.badgeText}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-600">发生:</span>
                    <span>{event.time}</span>
                  </div>

                  {event.resolvedTime && (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-gray-600">解决:</span>
                      <span>{event.resolvedTime}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-600">地点:</span>
                    <span>{event.location.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Management Actions */}

                      <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-9 text-sm"
              onClick={handleMarkComplete}
            >
              <CheckCircle className="w-4 h-4" />
              标记为已完成
            </Button>

            <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full flex items-center justify-center gap-2 h-9 text-sm"
                  variant="outline"
                >
                  <Users className="w-4 h-4" />
                  通知相关人员
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>选择接收人员</DialogTitle>
                  <DialogDescription>请选择需接收此事件的联系人</DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-3">
                  {[
                    { id: 1, name: "李华 - 区域监测员" },
                    { id: 2, name: "张伟 - 水质分析员" },
                    { id: 3, name: "王芳 - 管理负责人" },
                  ].map((contact) => (
                    <label key={contact.id} className="flex items-center gap-2">
                      <input type="checkbox" className="accent-blue-500" />
                      <span className="text-sm">{contact.name}</span>
                    </label>
                  ))}

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setNotifyDialogOpen(false)} className="flex-1">
                      取消
                    </Button>
                    <Button variant="blue" onClick={handleSendAlert} className="flex-1">
                      发送通知
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>


          {/* Add Supplementary Info */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-10 text-sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                添加补充信息
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>补充事件信息</DialogTitle>
                <DialogDescription>为事件 "{event.name}" 添加补充说明、数据或文件</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    文字说明
                  </Label>
                  <Textarea
                    placeholder="请输入补充说明信息..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">数据补充</Label>
                  <Input
                    placeholder="例如: pH=7.2, 温度=18.5℃"
                    value={dataInput}
                    onChange={(e) => setDataInput(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4" />
                    上传图片或文件
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.xlsx"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      已选择 {uploadedFiles.length} 个文件
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                    取消
                  </Button>
                  <Button variant="blue" onClick={handleSubmitInfo} className="flex-1">
                    提交补充信息
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Past Uploads */}
          <Card className="p-4">
            <h3 className="text-base mb-3 font-medium text-gray-700">进展信息</h3>
            {pastUploads.length > 0 ? (
              <ul className="space-y-3">
                {pastUploads.map((record) => (
                  <li
                    key={record.id}
                    className="bg-gray-50 rounded-md p-2.5 border border-gray-100"
                  >
                    <p className="text-xs text-gray-500 mb-1">📅 {record.time}</p>
                    <p className="text-xs text-gray-700 mb-1">{record.text}</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-blue-600">
                      {record.files.map((file, i) => (
                        <span key={i} className="flex items-center gap-0.5">
                          <File className="w-3 h-3" /> {file}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">暂无记录</p>
            )}
          </Card>
        </>
      ) : (
        <Card className="p-3">
    <h2 className="mb-3 text-base font-medium">事件位置地图</h2>

    {/* Ensure valid coordinates before rendering map */}
    {event.location &&
    typeof event.location.lat === "number" &&
    typeof event.location.lng === "number" &&
    !isNaN(event.location.lat) &&
    !isNaN(event.location.lng) ? (
      <InteractiveMapAmap
        locations={[
          {
            id: event.id,
            name: event.location.name,
            lat: event.location.lat,
            lng: event.location.lng,
            type: event.category,
            details: {
              "预警级别":
                event.severity === "red"
                  ? "红色"
                  : event.severity === "orange"
                  ? "橙色"
                  : event.severity === "yellow"
                  ? "黄色"
                  : "蓝色",
              "发生时间": event.time,
            },
          },
        ]}
        zoom={10}
        height="calc(100vh - 250px)"
        showLegend={false}
        typeColors={{
          气象: "#10b981",
          水质: "#3b82f6",
          危化品运输: "#ef4444",
        }}
      />
    ) : (
      <p className="text-sm text-gray-500 p-4">
        无效坐标，无法显示地图。
      </p>
    )}
  </Card>
      )}
    </div>
  );
}
