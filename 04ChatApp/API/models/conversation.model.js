import mongoose from "mongoose";

const conversatioSchea = new mongoose.Schema({
    partcipantsId: [
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