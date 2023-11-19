import { Schema } from "mongoose";

export const matchSchema = new Schema(
  {
    player1Id: { type: Schema.Types.ObjectId },
    // NOTE player 1 and 2 are set by put requests from the front end when people register for the tournament
    player2Id: { type: Schema.Types.ObjectId },
    roundNumber: { type: Number },
    boutNumber: { type: Number },
    bye1: { type: Boolean, default: false },
    bye2: { type: Boolean, default: false },
    winnerId: { type: Schema.Types.ObjectId },


    // NOTE When we draw these to the front end, they can be put into an array in the AppState for the current tournament. The round number can be their position in the array +1(put request)
    tournamentId: { type: Schema.Types.ObjectId, required: true },

    // NOTE this would be assigned in the manage tournament function by the winner of the tournament
    nextId: { type: Schema.Types.ObjectId },
    seedPosition1: { type: String },
    seedPosition2: { type: String }
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