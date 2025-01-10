import fs, { read, write } from "fs";
import path from "path";
// import { Job, JobStatus } from "./types";
import { randomUUID } from "crypto";
import { Mutex } from "async-mutex";
import { Job, JobStatus } from "../../types";
import axios, { AxiosError } from "axios";

const mutex = new Mutex();

export const readJobs = async (): Promise<Record<string, Job>> => {
  const res = await fs.promises.readFile(path.join("data.json"), "utf-8");
  return JSON.parse(res);
};

export const findJobById = async (id: string) => {
  const jobs = await readJobs();
  return jobs[id];
};

export const writeJobs = (newJobs: Record<string, Job>) => {
  return fs.promises.writeFile("data.json", JSON.stringify(newJobs));
};

export const addJob = async (title: string) => {
  return mutex.runExclusive(async () => {
    const jobs = await readJobs();

    const newJobId = randomUUID();

    jobs[newJobId] = {
      id: newJobId,
      title,
      imageUrl: "",
      status: "pending",
    };
    await writeJobs(jobs);

    return newJobId;
  });
};

export const resolveJob = (id: string) => {
  // get a random image from unsplash
  // read the data, add the image to the job and update it's status
  // Lock with mutex to avoid race conditions

  return mutex.runExclusive(async () => {
    const jobs = await readJobs();

    try {
      const randomURL = await getRandomUnsplashImageUrl();
      jobs[id] = {
        ...jobs[id],
        status: "resolved",
        imageUrl: randomURL,
      };

      await writeJobs(jobs);
    } catch (e) {
      console.log(e);
    }
  });
};

export const getRandomUnsplashImageUrl = async () => {
  const { data } = await axios.get(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&collections=1424340`,
    {
      headers: { Authorization: process.env.UNSPLASH_ACCESS_KEY },
    }
  );

  const url = (data.urls.thumb as string).split("?");
  const imageWithFixedHeight = url[0] + "?h=200&" + url[1];
  return imageWithFixedHeight;
};
