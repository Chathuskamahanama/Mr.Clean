import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const employeeSchema = new Schema({
  provider: {
    type: ObjectId,
    ref: "Provider",
  },
  type: {
    type: ObjectId,
    ref: "ServiceType",
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  currentlat: {
    type: Number,
  },
  currentlon: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  ratingCount: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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

const employeeModel = model("Employee", employeeSchema);

export default employeeModel;
