import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true, maxLength: 100 },
    name: { type: String, required: true },
    bio: { type: String, maxLength: 1000 },
    picture: { type: String, maxLength: 500 },
    coverImg: { type: String, maxLength: 500 },
    twitchUrl: { type: String, maxLength: 500 },
    youtubeUrl: { type: String, maxLength: 500 },
    twitterUrl: { type: String, maxLength: 500 },
    facebookUrl: { type: String, maxLength: 500 },
    instagramUrl: { type: String, maxLength: 500 },
    websiteUrl: { type: String, maxLength: 500 },

    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

