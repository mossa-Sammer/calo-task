export type JobStatus = "pending" | "resolved";

export interface Job {
  id: string;
  title: string;
  imageUrl: string;
  status: JobStatus;
}
