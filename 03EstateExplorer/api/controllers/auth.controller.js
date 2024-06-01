import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await User.findOne({ username });
        if (isUserExist) return next(errorHandler(400, "Username already exist"));

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) return next(errorHandler(400, "Email already exist"));

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

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "Email not exist"));

        const validPassowrd = bcryptjs.compareSync(password, validUser.password);
        if (!validPassowrd) return next(errorHandler(400, "Incorrect Email or password"));

        const cookie = jwt.sign({ _id: validUser._id }, process.env.JWT_TOKEN);

        const { password: abx, ...rest } = validUser._doc;
        res.cookie("cookie", cookie, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000
        }).status(200).json(rest)
    } catch (error) {
        next(error);
    }
}