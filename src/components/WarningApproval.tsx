import { ApprovalList } from "./ApprovalList";

interface Props {
  onBack: () => void;
}

export function WarningApproval({ onBack }: Props) {
  const approvals = [
    {
      id: "w-001",
      title: "藻类爆发预警（Ⅱ级）",
      date: "2024-10-14",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "w-002",
      title: "溶解氧异常预警",
      date: "2024-10-17",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  return (
    <ApprovalList
      title="预警审批"
      approvals={approvals}
      onBack={onBack}
    />
  );
}
