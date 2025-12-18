import { ApprovalList } from "./ApprovalList";

export function ReportApproval({ onBack }: { onBack: () => void }) {
  const approvals = [
    {
      id: "r-001",
      title: "2024年10月水质监测日报",
      date: "2024-10-15",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
    id: "r-002",
    title: "重点断面水质异常日报",
    date: "2024-10-16",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  }
  ];

  return (
    <ApprovalList
      title="报告审批"
      approvals={approvals}
      onBack={onBack}
    />
  );
}
