export class Tournament {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.gameId = data.gameId
        this.signUpDeadline = data.signUpDeadline
        this.startDate = new Date(data.startDate)
        this.endDate = new Date(data.endDate)
        this.address = data.address
        this.region = data.region
        this.entryPrice = data.entryPrice
        this.prizePool = data.prizePool
        this.capacity = data.capacity
        this.onlineOnly = data.onlineOnly
        this.imgUrl = data.imgUrl
        this.liveStreamUrl = data.liveStreamUrl
        this.winnerId = data.winnerId
        this.isLocked = data.isLocked
        this.isCancelled = data.isCancelled
        this.isPublished = data.isPublished
        this.gameName = data.gameName
        this.gameImg = data.gameImg
        this.instagramUrl = data.instagramUrl
        this.facebookUrl = data.facebookUrl
        this.twitterUrl = data.twitterUrl
        this.youTubeUrl = data.youTubeUrl
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.game = data.game
    }
}


// const tournament = {
//     import { Schema } from "mongoose";

// export const TournamentSchema = new Schema({
//     name: { type: String, required: true, maxLength: 75 },
//     description: { type: String, required: true, maxLength: 1000 },
//     gameId: { type: Schema.Types.ObjectId, ref: 'Game' },
//     signUpDeadline: { type: Date },
//     startDate: { type: Date },
//     endDate: { type: Date },
//     address: { type: String, maxLength: 100 },
//     region: { type: String, enum: ['west', 'midwest', 'southwest', 'southeast', 'northeast'] },
//     entryPrice: { type: String, maxLength: 10000 },
//     prizePool: { type: String, maxLength: 1000 },
//     capacity: { type: Number, maxLength: 100000 },
//     onlineOnly: { type: Boolean, default: false },
//     imgUrl: { type: String, maxLength: 500 },
//     liveStreamUrl: { type: String, maxLength: 500 },
//     winnerId: { type: Schema.Types.ObjectId, ref: 'Account' },
//     isLocked: { type: Boolean, default: false },
//     isCancelled: { type: Boolean, default: false },
//     isPublished: { type: Boolean, default: false },
//     gameName: { type: String, maxLength: 500 },
//     gameImg: { type: String, maxLength: 500 },
//     instagramUrl: { type: String, maxLength: 500 },
//     facebookUrl: { type: String, maxLength: 500 },
//     twitterUrl: { type: String, maxLength: 500 },
//     youTubeUrl: { type: String, maxLength: 500 },
//     website: { type: String, maxLength: 500 },
//     creatorId: { type: Schema.Types.ObjectId, required: true }

// },
//     {
//         timestamps: true, toJSON: { virtuals: true }
//     })

// TournamentSchema.virtual('game', {
//     localField: 'gameId',
//     foreignField: '_id',
//     ref: 'Game',
//     justOne: true,
// })
// }