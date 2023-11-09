import { Schema } from "mongoose";

export const matchSchema = new Schema(
  {
    player1Id: { type: Schema.Types.ObjectId },
    player2Id: { type: Schema.Types.ObjectId },
    roundNumber: { type: Number },
    tournamentId: { type: Schema.Types.ObjectId, required: true },
    winnerId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)
matchSchema.virtual('player 1', {
  localField: "player1Id",
  foreignField: "_id",
  ref: "Player",
  justOne: true
})
matchSchema.virtual("player 2", {
  localField: "player2Id",
  foreignField: "_id",
  ref: "Player",
  justOne: true
})
matchSchema.virtual("tournament", {
  localField: "tournamentId",
  foreignField: "_id",
  ref: "Tournament",
  justOne: true
})