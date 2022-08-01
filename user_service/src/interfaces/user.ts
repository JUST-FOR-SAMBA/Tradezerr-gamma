import { Document } from 'mongoose';

export default interface IUser extends Document {
    uid: string;
    username: string;
    email: string;
    passwordHash: string;
}
