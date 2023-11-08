import { Schema } from "mongoose";

export const TournamentSchema = new Schema({
    name: { type: String, required: true, maxLength: 75 },
    description: { type: String, required: true, maxLength: 1000 },
    gameId: { type: Schema.Types.ObjectId, ref: 'Game' },
    signUpDeadline: { type: Date, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    address: { type: String, maxLength: 100 },
    region: { type: String, enum: ['west', 'midwest', 'southwest', 'southeast', 'northeast'] },
    entryPrice: { type: String, maxLength: 10000 },
    prizePool: { type: String, maxLength: 1000 },
    capacity: { type: Number, maxLength: 100000 },
    onlineOnly: { type: Boolean, default: false },
    imgUrl: { type: URL, maxLength: 1000 },
    liveStreamUrl: { type: URL, maxLength: 1000 },
    winnerId: { type: Schema.Types.ObjectId, ref: 'Account' },
    isLocked: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    gameName: { type: String },
    gameImg: { type: URL }
},
    {
        timestamps: true, toJSON: { virtuals: true }
    })

TournamentSchema.virtual('game', {
    localField: 'gameId',
    foreignField: '_id',
    ref: 'Game',
    justOne: true,
})