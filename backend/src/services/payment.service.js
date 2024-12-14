import employeeModel from "../models/employee.model.js";
import jobModel from "../models/job.model.js";
import paymentModel from "../models/payment.model.js";

export const createPayment = async (req) => {
  const { idJob, photo, remark, rate } = req;

  const job = await jobModel
    .findOne({ _id: idJob, isActive: true })
    .populate("employee");

  if (!job) {
    return null;
  }

  job.paymentStatus = "PAID";
  await job.save();

  const employee = await employeeModel.findById(job.employee._id);

  let count_ = employee.ratingCount ? employee.ratingCount : 0;
  let rate_ = employee.rating ? employee.rating : 0;
  let cusRate_ = !isNaN(parseFloat(rate)) ? parseFloat(rate) : 0;

  employee.ratingCount = count_ + 1;
  employee.rating = (count_ * rate_ + cusRate_) / (count_ + 1);

  await employee.save();

  const payment = new paymentModel({
    job: job._id,
    photo,
    remark,
    isActive: true,
    createdDate: new Date(),
  });

  await payment.save();
  return payment;
};

export const changeStatus = async (id) => {
  const payment = await paymentModel.findById(id).populate("job");
  if (!payment) {
    return null;
  }
  const job = await jobModel.findByIdAndUpdate(payment.job._id, {
    paymentStatus: "CONFIRMED",
  });

  await job.save();
  return payment;
};

export const getPayments = async (query) => {
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

  const jobIds = jobs.map((job) => job._id);

  const payments = paymentModel.find({ job: { $in: jobIds } }).populate({
    path: "job",
    populate: { path: "employee client" },
  });

  return payments;
};
