export class Tournament {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.gameId = data.gameId
        this.signUpDeadline = data.signUpDeadline ? new Date(data.signUpDeadline) : null
        this.startDate = data.startDate ?  new Date(data.startDate) : new Date(new Date().setHours(new Date().getHours() * 24))
        this.endDate = data.endDate ?  new Date(data.endDate) : new Date(new Date().setHours(new Date().getHours() * 24))
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
        this.gameImg = data.gameImg || "src/assets/img/valorPanda.png" 
        this.instagramUrl = data.instagramUrl
        this.facebookUrl = data.facebookUrl
        this.twitterUrl = data.twitterUrl
        this.youTubeUrl = data.youTubeUrl
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.game = data.game
        this.playerCount = data.playerCount
    }
}



const tournament = {
    "_id": "654d4626e0b9c438e9ccd3b7",
    "name": "Apex Legends and degens",
    "description": "This is the spring brawl you'll certainly fall for",
    "startDate": "2024-03-02T07:00:00.000Z",
    "address": "5842 E Gemova st, Boise ID",
    "region": "west",
    "entryPrice": "2",
    "prizePool": "17",
    "capacity": 40,
    "onlineOnly": false,
    "isLocked": false,
    "isCancelled": false,
    "isPublished": false,
    "gameName": "Apex Legends",
    "gameImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvcG5RrJhwMCGznxOFS2GzB-c3rx0fJgnfA&usqp=CAU",
    "twitterUrl": "https://twitter.com/PlayApex",
    "creatorId": "654bfbd8f4fab14ebf37d8db",
    "createdAt": "2023-11-09T20:50:46.024Z",
    "updatedAt": "2023-11-09T20:52:52.781Z",
    "__v": 0,
    "id": "654d4626e0b9c438e9ccd3b7"
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