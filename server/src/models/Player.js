import { Schema } from "mongoose";

export const PlayerSchema = new Schema(
  {

  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)