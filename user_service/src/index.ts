import express from "express";
import logging from "./config/logging";
import mongoose from "mongoose";
import { config } from "./config/config";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const router = express();
const dbUrl = config.mongo.url as string;

// Connect to MongoBD
mongoose
  .connect(dbUrl, config.mongo.options)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    logging.error(error);
  });

// Logging Middleware
router.use((req, res, next) => {
  logging.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

//  Parse the Body {bodyParser is already included in Express}
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// API Access Policies
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Routes
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);

// Error Handling
router.use((_, res) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

// Listen
router.listen(config.server.port, () =>
  logging.info(`Server is running ${config.server.host}:${config.server.port}`)
);
