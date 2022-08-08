import { Document } from "mongoose";

export default interface IUser extends Document {
  _doc?: any;
  uid: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: any;
  status: string;
  phone: string;
  taxNumber: string;
  isVerified: boolean;
  uuid: string;
}
