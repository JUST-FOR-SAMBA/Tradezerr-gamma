import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String },
    uuid: { type: String },
    email: {
      type: String,
      required: true,
      max: 60,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    passwordHash: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["admin", "lender", "business-owner"],
      default: "lender",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
