import { Schema, model } from "mongoose";
import { ObjectId } from "bson";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
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

const userModel = model("User", userSchema);

export default userModel;
