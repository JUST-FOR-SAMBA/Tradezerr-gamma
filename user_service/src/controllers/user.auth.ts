import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Response, Request } from "express";
import User from "../models/user";
import IUser from "../interfaces/user";

const SECRET: any = process.env.SECRET;

/** Generating a JWT Token */
const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    SECRET,
    { expiresIn: "20d" }
  );
};

/** Login user */
export const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: "No account with this email has been registered." });
  }

  const credentialsValid = await argon2.verify(user.passwordHash, password);

  if (!credentialsValid) {
    return res.status(401).send({ message: "Invalid username or password." });
  }

  const accessToken = generateAccessToken(user);
  res.status(200).json({
    data: {
      accessToken,
      username: user,
      id: user._id,
    },
  });
};

/** Sign up user */
export const signupUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password needs to be atleast 6 characters long." });
  }

  if (!username || username.length > 35 || username.length < 3) {
    return res
      .status(400)
      .send({ message: "Username character length must be in range of 3-20." });
  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp("^" + username + "$", "i") },
  });

  const existingEmail = await User.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });

  if (existingUser) {
    return res.status(400).send({
      message: `Username '${username}' is already taken. Choose another one.`,
    });
  }
  if (existingEmail) {
    return res.status(400).send({
      message: `Email '${email}' is already taken. Choose another one.`,
    });
  }

  const passwordHash = await argon2.hash(password);
  const user = new User({
    username,
    email,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(200).json({
    data: {
      username: savedUser.username,
      email: savedUser.email,
      id: savedUser._id,
    },
  });
};
