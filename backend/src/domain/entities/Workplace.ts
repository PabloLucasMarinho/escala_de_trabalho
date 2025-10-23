import { Schema } from "mongoose";
import mongoose from "../../infrastructure/db/conn.js";
import type IWorkplace from "../../infrastructure/entities/IWorkplace.js";

const worplaceSchema = new Schema<IWorkplace>(
  {
    name: {
      type: String,
      required: true,
      set: (value: string) => value.toUpperCase(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Workplace = mongoose.model<IWorkplace>("Workplace", worplaceSchema);

export default Workplace;
