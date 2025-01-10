require("dotenv").config();

import express from "express";
import cors from "cors";

import { addJob, findJobById, readJobs, resolveJob } from "./operations";

function getRandomDelay() {
  return (Math.floor(Math.random() * 60) * 5 + 5) * 1000;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/jobs", async (req, res, next) => {
  const jobs = await readJobs();
  res.json(jobs);
});

app.get("/jobs/:jobId", async (req, res, next) => {
  const job = await findJobById(req.params.jobId);

  if (!job) {
    res.status(404).end();
  } else {
    res.json(job);
  }
});

app.post("/jobs", async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    res.status(422).json({ title: "Title is required" });
    return;
  }

  const newJobId = await addJob(title);

  res.json(newJobId);

  setTimeout(() => {
    resolveJob(newJobId);
  }, getRandomDelay());
});
