import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        res.status(200).json({
            message: "User created successfully"
        })
    } catch (error) {
        next(error);
    }
}