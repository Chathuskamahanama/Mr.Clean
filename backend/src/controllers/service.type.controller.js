import {
  createServiceType,
  getAllServiceTypes,
} from "../services/service.type.service.js";

export const create = async (req, res) => {
  try {
    const type = await createServiceType(req.body);

    if (!type) {
      return res.status(400).json({ message: "Service type already exist." });
    }

    res
      .status(201)
      .json({ message: "Service Type Created Successfully.", data: type });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const types = await getAllServiceTypes();
    res.status(200).json({ message: "Fetched Successfully.", data: types });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
