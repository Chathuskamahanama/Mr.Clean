import { compare, hash } from "bcrypt";

import userModel from "../models/user.model.js";
import employeeModel from "../models/employee.model.js";

export const userLogin = async (email, password) => {
  const user = await userModel.findOne({ email, isActive: true });

  if (!user) {
    return null;
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const empProfile = await employeeModel
    .findOne({
      user: user._id,
      isActive: true,
    })
    .populate("provider")
    .populate("type");

  return { user, empProfile };
};

export const userRegister = async (req) => {
  const { email, password, name, photo, phoneNo } = req;

  const isUser = await userModel.findOne({
    email: email.toLowerCase(),
    isActive: true,
  });

  if (isUser) {
    return null;
  }

  const user = new userModel({
    email: email.toLowerCase(),
    password: await hash(password, 10),
    photo,
    name,
    phoneNo,
    isActive: true,
    createdDate: new Date(),
  });

  await user.save();
  return user;
};
