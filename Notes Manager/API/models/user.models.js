import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    profileImage: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export const User = new mongoose.model("User", userSchema);