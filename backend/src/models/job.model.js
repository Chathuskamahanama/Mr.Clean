import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const jobSchema = new Schema({
  employee: {
    type: ObjectId,
    ref: "Employee",
  },
  client: {
    type: ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  updatedDate: {
    type: Date,
  },
  updatedBy: {
    type: ObjectId,
    ref: "User",
  },
  deactivatedDate: {
    type: Date,
  },
  deactivatedBy: {
    type: ObjectId,
    ref: "User",
  },
});

const jobModel = model("Job", jobSchema);

export default jobModel;
