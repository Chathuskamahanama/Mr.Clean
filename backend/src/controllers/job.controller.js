import { changeStatus, createJob, getJobs } from "../services/job.service.js";

export const create = async (req, res) => {
  try {
    const job = await createJob(req.body);
    if (!job) {
      return res.status(400).json({ message: "Job creation Failed" });
    }

    res.status(201).json({ message: "Job Created Successfully.", data: job });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const jobs = await getJobs(req.query);
    res.status(200).json({ message: "Fetched Successfully.", data: jobs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const id = req.query?.id;
    const { status } = req.body;

    const job = await changeStatus(id, status);

    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    res.status(201).json({ message: "Updated Successfully.", data: job });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
