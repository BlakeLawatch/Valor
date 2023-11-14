import { Schema } from "mongoose";

export const VideoSchema = new Schema(
    {
        title: { type: String, maxLength: 100 },
        accountId: { type: Schema.Types.ObjectId, required: true },
        videoUrl: { type: String, required: true, maxLength: 500 },
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)