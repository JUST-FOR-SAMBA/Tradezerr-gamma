import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { Response, Request, NextFunction } from "express";
import { User, Role } from "../models/";
import IUser from "../interfaces/user";
import IRoles from "../interfaces/roles";
import { sendConfirmationEmail } from "../config/nodemailer";
import { uuidGenerator } from "../_helpers/generateUuid";

const SECRET: any = process.env.SECRET;

/** Generating a JWT Token */
const generateAccessToken = (user: IUser, role: string[]) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: role,
    },
    SECRET,
    { expiresIn: "10d" }
  );
};

/** Login user */
export const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  })
    .populate("roles", "-__v")
    .exec();
  if (!user) {
    return res
      .status(400)
      .send({ message: "No account with this email has been registered." });
  }

  const credentialsValid = await argon2.verify(user.passwordHash, password);

  if (!credentialsValid) {
    return res.status(401).send({ message: "Invalid username or password." });
  }

  let authorities = [];

  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  }

  const accessToken = generateAccessToken(user, authorities);
  res.status(200).json({
    data: {
      id: user._id,
      accessToken,
      username: user.username,
      roles: authorities,
    },
  });
};

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

  const passwordHash = await argon2.hash(password);
  const user = new User({
    username,
    email,
    passwordHash,
    uuid: uuid,
  });

  Role.findOne(
    { name: role ? role : "lender" },
    async (err: any, role: IRoles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.roles = [role._id];

      const savedUser = await user.save();

      // Send confirmation email
      jwt.sign(
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
      res.status(200).json({
        data: {
          username: savedUser.username,
          email: savedUser.email,
          id: savedUser._id,
          status: savedUser.status,
        },
      });
    }
  );
};

export const verifyUser = async (req: Request, res: Response) => {
  const checkToken: jwt.JwtPayload | any = jwt.verify(req.params.token, SECRET);

  if (checkToken?.user) {
    const user = await User.findOne({ email: checkToken.user });
    if (user) {
      user.status = "Active";
      await user.save();
      res.status(200).send({ message: "Your account has been verified." });
    } else {
      res.status(400).send({ message: "Invalid token." });
    }
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
      message: " A message has been sent to your Email.",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
