import { Job as IJob } from "../../../types";
import JobStatusChip from "./JobStatusChip";

const pendingURL =
  "https://images.unsplash.com/photo-1735595065393-0a600eb5a18d?h=30&q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Job({ title, status, imageUrl }: IJob) {
  return (
    <div
      style={{
        border: "1px solid #333",
        maxWidth: "200px",
        textAlign: "center",
        borderRadius: ".25rem",
      }}
    >
      <img
        src={imageUrl ? imageUrl : pendingURL}
        alt="any"
        width={200}
        height={300}
        style={{
          objectFit: "cover",
        }}
      />
      <div style={{ padding: ".25rem" }}>
        <p>{title}</p>
        <JobStatusChip status={status} />
      </div>
    </div>
  );
}
