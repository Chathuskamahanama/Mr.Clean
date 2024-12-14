import { set, connect } from "mongoose";

const ConnectMongoDB = (URL) => {
  try {
    set("strictQuery", false);
    connect(URL);
    console.log("Successfully Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB Connection Failed");
  }
};

export default ConnectMongoDB;
