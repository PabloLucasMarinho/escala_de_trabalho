import { Schema } from "mongoose";
import mongoose from "../../infrastructure/db/conn.js";
import type IEmployee from "../../infrastructure/entities/IEmployee.js";

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      set: (value: string) => value.toUpperCase(),
    },
    adm: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
