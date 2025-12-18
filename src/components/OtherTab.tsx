import { useState } from "react";
import { Card } from "./ui/card";
import {
  FileText,
  Users,
  HelpCircle,
  ContactIcon,
  Archive,
  MessageCircle,
} from "lucide-react";
import { DailyReportList } from "./DailyReportList";
import { ReportApproval } from "./ReportApproval";
import { WarningApproval } from "./WarningApproval";
import { EmergencyApproval } from "./EmergencyApproval";

/* =======================
   Types
======================= */

type ViewType = "menu" | "daily-report" | "report-approval" | "warning-approval"| "emergency-approval";

type MenuItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

/* =======================
   Component
======================= */

export function OtherTab() {
  const [currentView, setCurrentView] = useState<ViewType>("menu");

  /* =======================
     View Switching
  ======================= */

  if (currentView === "daily-report") {
    return <DailyReportList onBack={() => setCurrentView("menu")} />;
  }

  if (currentView === "report-approval") {
    return <ReportApproval onBack={() => setCurrentView("menu")} />;
  }

  if (currentView === "warning-approval") {
    return <WarningApproval onBack={() => setCurrentView("menu")} />;
  }

  if (currentView === "emergency-approval") {
    return <EmergencyApproval onBack={() => setCurrentView("menu")} />;
  }

  /* =======================
     Menu Sections
  ======================= */

  const menuSections: MenuSection[] = [
    {
      title: "报告查询",
      items: [
        {
          icon: <FileText className="w-6 h-6" />,
          title: "日报",
          description: "日报查询",
          onClick: () => setCurrentView("daily-report"),
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "月报",
          description: "月报查询",
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "年报",
          description: "年报查询",
        },
      ],
    },
    {
      title: "代办审批",
      items: [
        {
          icon: <FileText className="w-6 h-6" />,
          title: "报告审批",
          description: "报告文件",
          onClick: () => setCurrentView("report-approval"),
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "预警审批",
          description: "预警信息",
          onClick: () => setCurrentView("warning-approval"),
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "应急审批",
          description: "应急预案",
          onClick: () => setCurrentView("emergency-approval"),
        }
      ],
    },
    {
      title: "其他功能",
      items: [
        {
          icon: <MessageCircle className="w-6 h-6" />,
          title: "通知",
          description: "历史信息",
        },
        {
          icon: <HelpCircle className="w-6 h-6" />,
          title: "AI问答",
          description: "智能问答",
        },
        {
          icon: <Archive className="w-6 h-6" />,
          title: "知识库",
          description: "相关资料",
        },
        {
          icon: <ContactIcon className="w-6 h-6" />,
          title: "通讯录",
          description: "相关人员",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "账户",
          description: "个人信息",
        },
      ],
    },
  ];

  /* =======================
     Render Menu
  ======================= */

  return (
    <div className="space-y-8 pr-4">
      {/* Page Title */}
      <div className="p-6">
        <h2 className="text-xl font-medium">个人中心</h2>
      </div>

      {/* Sections */}
      {menuSections.map(section => (
        <div key={section.title} className="space-y-3">
          {/* Section Header */}
          <div className="p-2 border-b border-gray-200 text-md font-medium">
            
    </div>

          {/* Section Grid */}
          <div className="grid grid-cols-2 gap-4 px-6">
            {section.items.map((item, index) => (
              <Card
                key={index}
                onClick={item.onClick}
                className={`p-6 transition-shadow ${
                  item.onClick
                    ? "cursor-pointer hover:shadow-lg"
                    : "opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
