import {
  changeStatus,
  createPayment,
  getPayments,
} from "../services/payment.service.js";

export const create = async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    if (!payment) {
      return res.status(400).json({ message: "Payment creation Failed" });
    }

    res
      .status(201)
      .json({ message: "Payment Created Successfully.", data: payment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const payments = await getPayments(req.query);
    res.status(200).json({ message: "Fetched Successfully.", data: payments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const id = req.query?.id;

    const payment = await changeStatus(id);

    if (!payment) {
      return res.status(400).json({ message: "Payment not found" });
    }
    res.status(201).json({ message: "Updated Successfully.", data: payment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
