import { userLogin, userRegister } from "../services/public.service.js";
import generateTokens from "../utils/generate.jwt.util.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userLogin(email.toLowerCase(), password);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Email or Password. Please Try Again." });
    }

    const token = await generateTokens(user);
    res
      .status(200)
      .json({ data: user, message: "Successfully Logged In", token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const user = await userRegister(req.body);

    if (!user) {
      return res.status(400).json({ message: "Email already in use." });
    }

    res
      .status(201)
      .json({ message: "Account Created Successfully.", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
