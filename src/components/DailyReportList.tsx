import { ReportList } from "./ReportList";

interface DailyReportListProps {
  onBack: () => void;
}

export function DailyReportList({ onBack }: DailyReportListProps) {
  // Mock data - replace with real data from API
  const dailyReports = [
    {
      id: "1",
      title: "藻类应急工作日报2025年第3期",
      date: "2025-07-25",
      category: "水质监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "2.3 MB",
      description: "全线142个监测站点水质数据汇总",
    },
    {
      id: "2",
      title: "污染源监测日报",
      date: "2025-11-05",
      category: "污染监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "1.8 MB",
      description: "重点污染源实时监测数据",
    },
    {
      id: "3",
      title: "预警事件处理日报",
      date: "2025-11-05",
      category: "预警处理",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "1.2 MB",
      description: "当日预警事件处理情况汇总",
    },
    {
      id: "4",
      title: "南水北调工程水质日报",
      date: "2025-11-04",
      category: "水质监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "2.1 MB",
      description: "全线142个监测站点水质数据汇总",
    },
    {
      id: "5",
      title: "污染源监测日报",
      date: "2025-11-04",
      category: "污染监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "1.9 MB",
      description: "重点污染源实时监测数据",
    },
    {
      id: "6",
      title: "预警事件处理日报",
      date: "2025-11-04",
      category: "预警处理",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "1.5 MB",
      description: "当日预警事件处理情况汇总",
    },
    {
      id: "7",
      title: "南水北调工程水质日报",
      date: "2025-11-03",
      category: "水质监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "2.4 MB",
      description: "全线142个监测站点水质数据汇总",
    },
    {
      id: "8",
      title: "污染源监测日报",
      date: "2025-11-03",
      category: "污染监测",
      fileUrl: "/mobile-demo/files/藻类应急工作日报2025年第3期.pdf",
      size: "1.7 MB",
      description: "重点污染源实时监测数据",
    },
  ];

  return (
    <ReportList
      title="日报查询"
      description=""
      reports={dailyReports}
      onBack={onBack}
    />
  );
}
