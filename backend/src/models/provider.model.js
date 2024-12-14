import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const providerSchema = new Schema({
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

const providerModel = model("Provider", providerSchema);

export default providerModel;
