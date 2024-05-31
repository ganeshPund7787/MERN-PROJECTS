import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date(Date.now())
    },
    isPin: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deleteArr: {
        type: Array,
        default: []
    }

}, { timestamps: true });

export const Notes = new mongoose.model("Notes", notesSchema);