import mongoose, { Schema } from "mongoose";
import type { IEmployee } from "./IEmployee.js";

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
    },
    adm: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
