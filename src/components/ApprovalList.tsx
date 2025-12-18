import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FileText, ArrowLeft, Eye } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import clsx from "clsx";


export interface ApprovalItem {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
}

interface ApprovalListProps {
  title: string;
  approvals: ApprovalItem[];
  onBack: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

/* =======================
   Component
======================= */

export function ApprovalList({
  title,
  approvals,
  onBack,
  onApprove,
  onReject,
}: ApprovalListProps) {
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [handled, setHandled] = useState<
    Record<string, "approved" | "rejected">
  >({});

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
        <h2 className="text-xl font-medium">{title}</h2>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        {approvals.length > 0 ? (
          approvals.map(item => (
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
