import mongoose from "mongoose";

const conversatioSchema = new mongoose.Schema({
    partcipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true })

export const Conversation = new mongoose.model("Conversation", conversatioSchema);