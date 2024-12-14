import serviceTypeModel from "../models/service.type.model.js";

export const createServiceType = async (req) => {
  const { name } = req;

  const isType = await serviceTypeModel.findOne({ name, isActive: true });

  if (isType) {
    return null;
  }

  const serviceType = new serviceTypeModel({
    name: name,
    isActive: true,
    createdDate: new Date(),
  });

  await serviceType.save();
  return serviceType;
};

export const getAllServiceTypes = async () => {
  const types = await serviceTypeModel.find({ isActive: true });
  return types;
};
