import mongoose, { Schema } from "mongoose";
import type { IShift } from "./IShift.js";
import { Weekday } from "../enums/Weekday.js";

const shiftSchema = new Schema<IShift>(
  {
    effectiveDate: {
      type: Date,
      required: true,
    },
    terminationDate: {
      type: Date,
      required: true,
    },
    shiftStart: {
      type: String,
      required: true,
    },
    shiftEnd: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      enum: Object.values(Weekday),
      required: true,
    },
    workplace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workplace",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Shift = mongoose.model<IShift>("Shift", shiftSchema);

export default Shift;
