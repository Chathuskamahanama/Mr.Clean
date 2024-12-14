import {
  createEmployee,
  deactivateEmployee,
  getAllEmployees,
  getLocation,
  getUserData,
  saveLocation,
} from "../services/employee.service.js";

export const create = async (req, res) => {
  try {
    const emp = await createEmployee(req.body);

    if (!emp) {
      return res.status(400).json({ message: "Email already in use" });
    }

    res
      .status(201)
      .json({ message: "Service Type Created Successfully.", data: emp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const get = async (req, res) => {
  try {
    const emp = await getAllEmployees(req.query);
    res.status(200).json({ message: "Fetched Successfully.", data: emp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deactivate = async (req, res) => {
  try {
    const { id } = req.body;
    const emp = await deactivateEmployee(id);

    if (!emp) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    res.status(201).json({ message: "Deleted Successfully.", data: emp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const location = async (req, res) => {
  try {
    const id = req.query?.id;
    const location = await getLocation(id);

    if (!location) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    res.status(200).json({ message: "Fetched Successfully.", data: location });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const locationSave = async (req, res) => {
  try {
    const id = req.query?.id;
    const { lat, lng } = req.body;
    const location = await saveLocation(id, lat, lng);

    if (!location) {
      return res.status(400).json({ message: "Employee doesnt exist" });
    }
    res
      .status(201)
      .json({ message: "Location Saved Successfully.", data: location });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const me = async (req, res) => {
  try {
    const requester = res.locals.user;

    const user = await getUserData(requester.user);

    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    res.status(200).json({ message: "Fetched Successfully.", data: user });
  } catch (err) {
    console.log(err);
  }
};
