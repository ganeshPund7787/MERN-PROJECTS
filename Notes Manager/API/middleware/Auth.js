
import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = (req, res, next) => {
    try {
        const { cookie } = req.cookies;

        if (!cookie) return next(errorHandler(404, "You should login first"));

        jwt.verify(cookie, process.env.JWT_SECREATE_KEY, async (err, user) => {
            if (err) return next(errorHandler(400, `Error while get token`));
            req.user = await User.findById({ _id: user._id });
            next();
        })

    } catch (error) {
        console.log(`Error While User Auth : ${error}`)
        next();
    }
}