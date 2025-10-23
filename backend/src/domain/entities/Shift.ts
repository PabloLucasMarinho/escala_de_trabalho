import { Schema } from "mongoose";
import mongoose from "../../infrastructure/db/conn.js";
import type IShift from "../../infrastructure/entities/IShift.js";

const shiftSchema = new Schema<IShift>(
  {
    dateInit: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
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
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const Shift = mongoose.model<IShift>("Shift", shiftSchema);

export default Shift;
