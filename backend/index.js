import "dotenv/config";
import express from "express";
import cors from "cors";

import config from "./src/configs/env.config.js";
import ConnectMongoDB from "./src/utils/connect.mongodb.util.js";
import Authorization from "./src/middlewares/authorization.middleware.js";

import PublicRouter from "./src/routes/public.route.js";
import ServiceTypeRouter from "./src/routes/service.type.route.js";
import ProviderRouter from "./src/routes/provider.route.js";
import EmployeeRoute from "./src/routes/employee.route.js";
import JobRoute from "./src/routes/job.route.js";
import PaymentRoute from "./src/routes/payment.router.js";

const app = express();

const PORT = config.port;
const URL = config.mongoUrl;

app.use(
  cors({
    methods: ["GET", "POST", "PUT"],
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Up and Running" });
});

app.use("/api/v1/public", PublicRouter);
app.use("/api/v1/type", Authorization, ServiceTypeRouter);
app.use("/api/v1/provider", Authorization, ProviderRouter);
app.use("/api/v1/emp", Authorization, EmployeeRoute);
app.use("/api/v1/job", Authorization, JobRoute);
app.use("/api/v1/payment", Authorization, PaymentRoute);

ConnectMongoDB(URL);

app.listen(PORT, () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`);
});
