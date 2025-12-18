import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FileText, ArrowLeft, Eye } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import clsx from "clsx";

/* =======================
   Types
======================= */

type ApprovalType = "report" | "warning" | "emergency";

interface ApprovalItem {
  id: string;
  title: string;
  date: string;
  type: ApprovalType;
  fileUrl: string;
}

interface ApprovalListProps {
  approvals?: ApprovalItem[];
  onBack: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

/* =======================
   Tabs
======================= */

const TABS = [
  { label: "报告", value: "report" },
  { label: "预警", value: "warning" },
  { label: "应急", value: "emergency" },
] as const;

/* =======================
   Mock Data
======================= */

const MOCK_APPROVALS: ApprovalItem[] = [
  {
    id: "r-001",
    title: "2024年10月水质监测日报",
    date: "2024-10-15",
    type: "report",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "r-002",
    title: "重点断面水质异常日报",
    date: "2024-10-16",
    type: "report",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "w-001",
    title: "藻类爆发预警（Ⅱ级）",
    date: "2024-10-14",
    type: "warning",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "w-002",
    title: "溶解氧异常预警",
    date: "2024-10-17",
    type: "warning",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "e-001",
    title: "突发污染事件应急处置方案",
    date: "2024-10-13",
    type: "emergency",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

/* =======================
   Component
======================= */

export function ApprovalList({
  approvals = MOCK_APPROVALS,
  onBack,
  onApprove,
  onReject,
}: ApprovalListProps) {
  const [activeTab, setActiveTab] = useState<ApprovalType>("report");
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [handled, setHandled] = useState<
    Record<string, "approved" | "rejected">
  >({});

  const filtered = approvals.filter(item => item.type === activeTab);

  const handleApprove = (id: string) => {
    setHandled(prev => ({ ...prev, [id]: "approved" }));
    onApprove?.(id);
  };

  const handleReject = (id: string) => {
    setHandled(prev => ({ ...prev, [id]: "rejected" }));
    onReject?.(id);
  };

  return (
    <div className="h-full flex flex-col bg-white pr-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 pb-4 border-b bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-medium">审批代办</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b px-4">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={clsx(
              "flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.value
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div
              key={item.id}
              className="px-4 py-3 border-b hover:bg-gray-50"
            >
              {/* Title */}
              <div className="flex items-start gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-500 mt-1" />
                <div className="flex-1 text-lg font-medium">
                  {item.title}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between ml-6">
                <span className="text-xs text-gray-500">
                  {item.date}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => {
                      setSelectedItem(item);
                      setPdfOpen(true);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    查看
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!handled[item.id]}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleApprove(item.id)}
                  >
                    通过
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!handled[item.id]}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleReject(item.id)}
                  >
                    驳回
                  </Button>

                  {handled[item.id] && (
                    <span
                      className={clsx(
                        "text-xs ml-1",
                        handled[item.id] === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {handled[item.id] === "approved"
                        ? "已通过"
                        : "已驳回"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-gray-400">
            暂无待审批事项
          </div>
        )}
      </ScrollArea>

      {/* PDF Dialog */}
      <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
        <DialogContent className="max-w-2xl h-90p flex flex-col rounded-none">
          <DialogHeader className="border-b bg-gray-50 px-4 py-3">
            <DialogTitle className="text-base">
              {selectedItem?.title}
            </DialogTitle>
            <div className="text-xs text-gray-500">
              {selectedItem?.date}
            </div>
          </DialogHeader>

          <div className="flex-1 bg-gray-100">
            {selectedItem && (
              <iframe
                src={selectedItem.fileUrl}
                className="w-full h-full border-0"
                title={selectedItem.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
