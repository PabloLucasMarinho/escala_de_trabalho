import { Schema } from "mongoose";
import mongoose from "../../infrastructure/db/conn.js";
import type IUser from "../../infrastructure/entities/IUser.js";
import { NameFormatter } from "../../application/Services/NameFormatter.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      set: (value: string) => NameFormatter(value),
    },
    email: {
      type: String,
      required: true,
      set: (value: string) => value.toLowerCase(),
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
