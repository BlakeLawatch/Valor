import { Schema } from "mongoose";

export const PlayerSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true },
    tournamentId: { type: Schema.Types.ObjectId, required: true },
    seed: { type: Number }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PlayerSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

PlayerSchema.virtual('tournament', {
  localField: 'tournamentId',
  foreignField: '_id',
  ref: 'Tournament',
  justOne: true
})