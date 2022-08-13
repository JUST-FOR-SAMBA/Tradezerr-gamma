import { Request, Response } from "express";
import logging from "../config/logging";
import User from "../models/user";
import argon2 from "argon2";

// Get one user by id
const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  logging.info(`Incoming read for user with username ${id}`);

  User.findById(id)
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          data: user,
        });
      } else {
        return res.status(404).json({
          error: "User not found.",
        });
      }
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message,
      });
    });
};

//  Get all users (admin only)
const readAll = (_: Request, res: Response) => {
  logging.info("Read all route called");

  User.find()
    .exec()
    .then((users) => {
      return res.status(200).json({
        data: users,
      });
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        message: error.message,
      });
    });
};

// Update user by id
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId == id) {
    logging.info(`Incoming update for user with username ${id}`);

    try {
      const checkUser = await User.findOne({
        email: { $regex: new RegExp("^" + req.body.mail + "$", "i") },
      });

      if (checkUser) {
        return res
          .status(404)
          .send({ message: "This username is already taken" });
      }

      const user = await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(404).json({
      error: "You can only update your account.",
    });
  }
};

// Delete user by id
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  logging.info(`Incoming delete for user with username ${id}`);

  User.findByIdAndDelete(id)
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: "User deleted.",
        });
      } else {
        return res.status(404).json({
          error: "User not found.",
        });
      }
    })
    .catch((error) => {
      logging.error(error.message);

      return res.status(500).json({
        error: error.message,
      });
    });
};

// verify user by id
const verifyUser = async (req: Request, res: Response) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      user.save();
      return res.status(200).send({ message: "User Verified." });
    })
    .catch((e) => console.log("error", e));
};

export default {
  read,
  readAll,
  updateUser,
  deleteUser,
  verifyUser,
};
