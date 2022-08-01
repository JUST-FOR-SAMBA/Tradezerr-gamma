import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String },
    email: {
      type: String,
      required: true,
      max: 60,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
