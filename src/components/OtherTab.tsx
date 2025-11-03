import { Card } from "./ui/card";
import {
  Settings,
  FileText,
  Users,
  HelpCircle,
} from "lucide-react";

export function OtherTab() {
  const menuItems = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "日报",
      description: "日报查询",
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
    {
      icon: <FileText className="w-6 h-6" />,
      title: "通知",
      description: "历史信息",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "AI问答",
      description: "智能问答",
    },
        {
      icon: <Users className="w-6 h-6" />,
      title: "知识库",
      description: "相关资料查询",
    },
        {
      icon: <Users className="w-6 h-6" />,
      title: "通讯录",
      description: "相关人员信息",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "账户",
      description: "管理个人信息",
    },
  ];

  return (
    <div className="space-y-6 pr-4">
      <div className="p-4">
        <h2 className="text-xl">个人中心</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                {item.icon}
              </div>
              <div>
                <h3 className="mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}