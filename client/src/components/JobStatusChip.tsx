import { JobStatus } from "../../../types";

interface StatusChipProps {
  status: JobStatus;
}

export default function JobStatusChip({ status }: StatusChipProps) {
  return (
    <div
      style={{
        padding: ".5rem",
        borderRadius: "2rem",
        color: "#fff",
        background: status === "pending" ? "gray" : "green",
      }}
    >
      {status}
    </div>
  );
}
