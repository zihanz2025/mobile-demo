import { ApprovalList } from "./ApprovalList";

interface Props {
  onBack: () => void;
}

export function EmergencyApproval({ onBack }: Props) {
  const approvals = [
    {
      id: "e-001",
      title: "突发污染事件应急处置方案",
      date: "2024-10-13",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "e-002",
      title: "水源地污染应急响应流程",
      date: "2024-10-18",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  return (
    <ApprovalList
      title="应急审批"
      approvals={approvals}
      onBack={onBack}
    />
  );
}
