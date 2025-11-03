import { useState } from "react";
import { WaterQualityTab } from "./components/WaterQualityTab";
import { PollutionSourceTab } from "./components/PollutionSourceTab";
import { QualityEvaluationTab } from "./components/QualityEvaluationTab";
import { AlertTab } from "./components/AlertTab";
import { OtherTab } from "./components/OtherTab";
import { Droplets, Factory, AlertTriangle, AlertCircleIcon, UserCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("water");

  const tabs = [
    { id: "water", label: "监测", icon: <Droplets className="w-5 h-5" /> },
    { id: "evaluation", label: "分析", icon: <Factory className="w-5 h-5" /> },
    { id: "pollution", label: "风险", icon: <AlertCircleIcon className="w-5 h-5" /> },
    { id: "alert", label: "预警", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "other", label: "个人", icon: <UserCircle className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "water":
        return <WaterQualityTab />;
      case "pollution":
        return <PollutionSourceTab />;
      case "evaluation":
        return <QualityEvaluationTab />;
      case "alert":
        return <AlertTab />;
      case "other":
        return <OtherTab />;
      default:
        return <WaterQualityTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-medium">水质监测预警技术中心移动端</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 py-4 overflow-y-auto h-[calc(100vh-7rem)]">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 safe-area-inset-bottom">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className={`mb-0.5 ${activeTab === tab.id ? "scale-110" : ""} transition-transform`}>
                  {tab.icon}
                </div>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
