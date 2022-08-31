import express from "express";
import 'express-async-errors';
import cookieSession from 'cookie-session';
import logging from "./config/logging";
import mongoose from "mongoose";
import { config } from "./config/config";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const app = express();
app.set('trust proxy', true);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  secure: process.env.NODE_ENV !== 'test',
}))
// Connect to MongoBD
const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb://mongodb-user-0.mongodb-user:27017/user');
    console.log('Mongo db connected!');
  } catch (err) {
    logging.error(err);
  }
}

//  Parse the Body {bodyParser is already included in Express}
app.use(express.json());


// Routes
app.use("/api/users/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error Handling
app.use((_, res) => {
  const error = new Error("User Service Page Not found");

  res.status(404).json({
    message: error.message,
  });
});

// Listen

connectMongo();
app.listen(8080, () =>
  logging.info(`Server is running ${config.server.host}:${config.server.port}`)
);

// Guess Derick will use his approach