import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const paymentSchema = new Schema({
  job: {
    type: ObjectId,
    ref: "Job",
  },
  remark: {
    type: String,
    required: true,
  },
  photo: {
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

const paymentModel = model("Payment", paymentSchema);

export default paymentModel;
