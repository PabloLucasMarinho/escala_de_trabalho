import mongoose, { Schema } from "mongoose";
import type { IWorkplace } from "./IWorkplace.js";

const worplaceSchema = new Schema<IWorkplace>(
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
  },
  { timestamps: true }
);

const Workplace = mongoose.model<IWorkplace>("Workplace", worplaceSchema);

export default Workplace;
