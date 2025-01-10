import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import Job from "./components/Job";
import { Job as IJob } from "../../types";

import "./App.css";

const Axios = axios.create({
  baseURL: "http://localhost:3000",
});

function App() {
  const [jobToAdd, setJobToAdd] = useState("");

  const {
    data: jobs,
    isLoading,
    isError,
    refetch,
  } = useQuery<IJob[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      return (await Axios.get("/jobs")).data;
    },
    refetchInterval: 5000,
  });

  const mutation = useMutation({
    mutationFn: (job: string) =>
      Axios.post("/jobs", {
        title: job,
      }),
    onSuccess: () => {
      toast.success("job created!");
      refetch();
    },
    onError: () => {
      toast.error("Can't create the job");
    },
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setJobToAdd(e.target.value);

  const submitJob: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await mutation.mutate(jobToAdd);
    setJobToAdd("");
  };

  const renderJobs = () => {
    if (isLoading) {
      return <p>"Loading Jobs..."</p>;
    }

    if (isError) {
      return <p>Sorry, An Error happended :(</p>;
    }

    if (jobs) {
      return Object.entries(jobs ?? {}).map(([jobId, job]) => (
        <Job key={jobId} {...job} />
      ));
    }
  };

  return (
    <div>
      <h1>Job Board</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 400,
            border: "1px solid green",
            padding: "1rem",
            height: "fit-content",
          }}
        >
          <form onSubmit={submitJob}>
            <h2 style={{ marginBottom: "1.5rem" }}>Create Job</h2>
            <input
              disabled={mutation.isPending}
              style={{ marginBottom: "1rem" }}
              placeholder="Enter a job"
              value={jobToAdd}
              onChange={handleChange}
            />
            <button type="submit" disabled={mutation.isPending}>
              Create A job
            </button>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {renderJobs()}
        </div>
      </div>
    </div>
  );
}

export default App;
