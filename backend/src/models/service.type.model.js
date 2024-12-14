import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const serviceTypeSchema = new Schema({
  name: {
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

const serviceTypeModel = model("ServiceType", serviceTypeSchema);

export default serviceTypeModel;
