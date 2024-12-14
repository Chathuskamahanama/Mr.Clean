import employeeModel from "../models/employee.model.js";
import jobModel from "../models/job.model.js";
import userModel from "../models/user.model.js";

export const createJob = async (req) => {
  const { idEmployee, idClient, description, address } = req;

  const client = await userModel.findOne({
    _id: idClient,
    isActive: true,
  });

  if (!client) {
    return null;
  }

  const employee = await employeeModel.findOne({
    _id: idEmployee,
    isActive: true,
  });

  if (!employee) {
    return null;
  }

  const job = new jobModel({
    client: client._id,
    employee: employee._id,
    description: description,
    address: address,
    isActive: true,
    status: "ALLOCATED",
    paymentStatus: "NOT PAID",
    createdDate: new Date(),
  });

  await job.save();
  return job;
};

export const getJobs = async (query) => {
  const filter = {};

  const client = query?.client;
  const employee = query?.employee;

  if (client) {
    filter.client = client;
  }

  if (employee) {
    filter.employee = employee;
  }

  filter.isActive = true;

  const jobs = await jobModel
    .find(filter)
    .populate("client")
    .populate("employee");

  return jobs;
};

export const changeStatus = async (id, status) => {
  const job = await jobModel.findByIdAndUpdate(id, { status });
  if (!job) {
    return null;
  }
  return job;
};
