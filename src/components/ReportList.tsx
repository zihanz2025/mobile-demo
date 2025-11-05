import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { FileText, Download, ArrowLeft, Eye } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface ReportFile {
  id: string;
  title: string;
  date: string;
  category: string;
  fileUrl: string;
  size?: string;
  description?: string;
}

interface ReportListProps {
  title: string;
  description: string;
  reports: ReportFile[];
  onBack: () => void;
}

export function ReportList({ title, description, reports, onBack }: ReportListProps) {
  const [selectedReport, setSelectedReport] = useState<ReportFile | null>(null);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  const handleOpenPdf = (report: ReportFile) => {
    setSelectedReport(report);
    setPdfDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 pb-6 border-b bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl">{title}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      {/* Report List */}
      <ScrollArea className="flex-1">
        <div>
          {reports.length > 0 ? (
            <div>
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="px-4 py-3 border-b hover:bg-gray-50 transition-colors"
                >
                  {/* First Row: Icon + Title */}
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0 font-medium text-lg text-gray-900 leading-snug">
                      {report.title}
                    </div>
                  </div>

                  {/* Second Row: Date + Actions */}
                  <div className="flex items-center justify-between ml-6">
                    <span className="text-xs text-gray-500">
                      {report.date}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="link"
                        onClick={() => handleOpenPdf(report)}
                        className="h-7 px-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        查看
                      </Button>
                      <Button
                        size="sm"
                        variant="link"
                        onClick={() => window.open(report.fileUrl, "_blank")}
                        className="h-7 px-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        下载
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-400">暂无报告数据</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* PDF Viewer Dialog */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="w-full h-90p p-0 flex flex-col">
          <DialogHeader className="px-4 py-3 border-b bg-gray-50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-base font-medium">
                  {selectedReport?.title}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600">
                  <span>{selectedReport?.date}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden bg-gray-100">
            {selectedReport && (
              <iframe
                src={selectedReport.fileUrl}
                className="w-full h-full border-0"
                title={selectedReport.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
