import mongoose, { Schema } from "mongoose";
import IRoles from "../interfaces/roles";

const Role: Schema = new Schema({
  name: String,
});

export default mongoose.model<IRoles>("Role", Role);
