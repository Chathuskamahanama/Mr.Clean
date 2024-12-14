import jwt from "jsonwebtoken";

import config from "../configs/env.config.js";

const { verify } = jwt;

const authorization = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      res
        .status(401)
        .json({ message: "You must be logged in to access this resource" });
    } else {
      verify(accessToken, config.accessToken, async (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ message: "Invalid Access Token. Please Login." });
        } else {
          res.locals.user = user;
          next();
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Something Went Wrong! Authorization Failed!",
    });
  }
};

export default authorization;
