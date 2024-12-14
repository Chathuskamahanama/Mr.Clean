import jwt from "jsonwebtoken";

import config from "../configs/env.config.js";

const { sign } = jwt;

const ACCESS_SECRET = config.accessToken;

const generateTokens = async (data) => {
  const accessToken = sign({ user: data.user._id }, ACCESS_SECRET, {
    expiresIn: "12h",
  });

  return accessToken;
};

export default generateTokens;
