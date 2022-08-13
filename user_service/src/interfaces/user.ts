import { Document } from "mongoose";

export default interface IUser extends Document {
  _doc?: any;
  uid: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  status: string;
  phone: string;
  taxNumber: string;
  isVerified: boolean;
  uuid: string;
}
