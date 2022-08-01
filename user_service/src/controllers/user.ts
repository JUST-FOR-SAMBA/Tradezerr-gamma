import { Request, Response } from 'express';
import logging from '../config/logging';
import User from '../models/user';

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    const checkUser = await User.findOne({ username: { $regex: new RegExp('^' + id + '$', 'i') } });

    logging.info(`Incoming read for user with username ${id}`);

    User.findById(checkUser?._id)
        .exec()
        .then((user) => {
            if (user) {
                return res.status(200).json({
                    user: user
                });
            } else {
                return res.status(404).json({
                    error: 'User not found.'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                error: error.message
            });
        });
};

const readAll = (_: Request, res: Response) => {
    logging.info('Read all route called');

    User.find()
        .exec()
        .then((users) => {
            return res.status(200).json({
                count: users.length,
                users: users
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    read,
    readAll
};
