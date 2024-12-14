import { hash } from "bcrypt";

import userModel from "../models/user.model.js";
import employeeModel from "../models/employee.model.js";
import serviceTypeModel from "../models/service.type.model.js";
import providerModel from "../models/provider.model.js";

export const createEmployee = async (req) => {
  const { email, password, name, photo, phoneNo, idProvider, idServiceType } =
    req;

  const isUser = await userModel.findOne({
    email: email.toLowerCase(),
    isActive: true,
  });

  if (isUser) {
    return null;
  }

  const serviceType = await serviceTypeModel.findOne({ _id: idServiceType });
  const provider = await providerModel.findOne({ _id: idProvider });

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

  const emp = new employeeModel({
    provider: provider ? provider._id : null,
    type: serviceType ? serviceType._id : null,
    user: user._id,
    isAdmin: false,
    isActive: true,
    createdDate: new Date(),
  });

  await emp.save();
  return emp;
};

export const getAllEmployees = async (query) => {
  const filter = {};

  const type = query?.type;
  const provider = query?.provider;
  const isAdmin = query?.admin;

  if (type) {
    filter.type = type;
  }

  if (provider) {
    filter.provider = provider;
  }

  if (isAdmin) {
    filter.isAdmin = isAdmin;
  }

  filter.isActive = true;

  const employees = await employeeModel
    .find(filter)
    .populate("user")
    .populate("provider")
    .populate("type");
  return employees;
};

export const deactivateEmployee = async (id) => {
  const emp = await employeeModel.findByIdAndUpdate(id, {
    isActive: false,
  });

  if (!emp) {
    return null;
  }

  await userModel.findByIdAndUpdate(emp.user, { isActive: false });

  return emp;
};

export const getLocation = async (id) => {
  const emp = await employeeModel.findOne({
    _id: id,
    isActive: true,
  });

  if (!emp) {
    return null;
  }

  return {
    lat: emp.currentlat,
    lon: emp.currentlon,
  };
};

export const saveLocation = async (id, lat, lng) => {
  const emp = await employeeModel.findByIdAndUpdate(id, {
    currentlat: lat,
    currentlon: lng,
  });

  if (!emp) {
    return null;
  }

  return emp;
};

export const getUserData = async (id) => {
  const user = await userModel.findOne({ _id: id, isActive: true });

  if (!user) {
    return null;
  }

  const empProfile = await employeeModel
    .findOne({
      user: id,
      isActive: true,
    })
    .populate("provider")
    .populate("type");

  return { user, empProfile };
};
