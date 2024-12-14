import { createProvider } from "../services/provoider.service.js";

export const create = async (req, res) => {
  try {
    const provider = await createProvider(req.body);

    if (!provider) {
      return res.status(400).json({ message: "Provider already exist." });
    }

    res
      .status(201)
      .json({ message: "Provider Created Successfully.", data: provider });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
