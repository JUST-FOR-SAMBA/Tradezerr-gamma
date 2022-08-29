import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Response, Request, NextFunction } from "express";
import { User } from "../models/";
import IUser from "../interfaces/user";

import { sendConfirmationEmail } from "../config/nodemailer";
import { uuidGenerator } from "../_helpers/generateUuid";

const SECRET: any = process.env.JWT_SECRET;

/** Generating a JWT Token */
const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
      status: user.isVerified,
    },
    SECRET,
    { expiresIn: "5d" }
  );
};

/** Login user */
export const loginUser = async (req: Request, res: Response) => {

  const { password, email } = req.body;
  const user = await User.findOne({email})
  
  if (!user) {
    return res
      .status(400)
      .send({ message: "No account with this email has been registered." });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ message: "Invalid username or password." });
  }

  const accessToken = generateAccessToken(user);
  req.session = {
    jwt: accessToken
  };
  res.status(200).json({
    data: {
      id: user._id,
      accessToken,
      username: user.username,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
  
};
/** Sign admin up */
// {
//   "username": "Winner-Trad01",
//   "email": "musolewinner@gmail.com",
//   "password": "123456"
// }
export const signupAdmin = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const uuid = uuidGenerator();

  const numberOfAdmin = User.find({email: req.body.email}).count;
  if(Number(numberOfAdmin) > 3){
    res.status(401).send({message: "Unauthorized"})
  }


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

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    passwordHash,
    role: "admin",
    isVerified: true,
    uuid: uuid,
  });

  const savedUser = await user.save();

  const token = jwt.sign(
    {
      id: savedUser._id,
      username: savedUser.username,
      role: savedUser.role,
      status: savedUser.isVerified,    
    },
    SECRET,
    { expiresIn: "1d" },
    (err: any, emailToken: any) => {
      const url = `http://localhost:1337/api/auth/verify/${emailToken}`;
      sendConfirmationEmail(user.username, user.email, url);
    }
  );

  req.session = {
    jwt: token
  }
  res.status(200).json({
    data: {
      username: savedUser.username,
      email: savedUser.email,
      id: savedUser._id,
      isVerified: savedUser.isVerified,
      role: savedUser.role,
    },
  });


}
/** Sign up user */
export const signupUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const uuid = uuidGenerator();

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

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    passwordHash,
    uuid: uuid,
  });
  const savedUser = await user.save();

  const token = jwt.sign(
    {
      user: savedUser.email,
    },
    SECRET,
    { expiresIn: "1d" },
    (err: any, emailToken: any) => {
      const url = `http://localhost:1337/api/auth/verify/${emailToken}`;
      sendConfirmationEmail(user.username, user.email, url);
    }
  );

  req.session = {
    jwt: token
  }
  res.status(200).json({
    data: {
      username: savedUser.username,
      email: savedUser.email,
      id: savedUser._id,
      isVerified: savedUser.isVerified,
      role: savedUser.role,
    },
  });
};

export const verifyUser = async (req: Request, res: Response) => {
  // to activate a user, admin role is required
  const userId = req.query.userId;

  const user = await User.findOne({_id: userId})
  if(user){
    user.isVerified = true;
    user.status = "Active";
    const theUser = await user.save();
    res.status(200).send(
      { 
        message: `${theUser.username} has been verified.`,
      });

  } else {
    res.status(404).send({message: "User Not Found"})
  }
 
};

// Resend mail verification
export const resendMail = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    jwt.sign(
      {
        user: email,
      },
      SECRET,
      { expiresIn: "1d" },
      (err: any, emailToken: any) => {
        const url = `http://localhost:1337/api/auth/verify/${emailToken}`;
        sendConfirmationEmail(username, email, url);
      }
    );
    res.status(200).send({
      message: "A message has been sent to your Email.",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
