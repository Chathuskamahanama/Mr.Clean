import providerModel from "../models/provider.model.js";

export const createProvider = async (req) => {
  const { name } = req;

  const isProvider = await providerModel.findOne({ name, isActive: true });

  if (isProvider) {
    return null;
  }

  const provider = new providerModel({
    name: name,
    isActive: true,
    createdDate: new Date(),
  });

  await provider.save();
  return provider;
};
