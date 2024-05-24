import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await User.findOne({ email })

        if (isUserExist) return next(errorHandler(400, "email already exist"));

        const hashPassword = bcryptjs.hashSync(password, 10);

        await User.create({ username, email, password: hashPassword });

        res.status(202).json({
            success: true,
            message: "User created successfuly"
        });
    } catch (error) {
        console.log(`Error while sign up : ${error}`)
        next();
    }
}

export const signin = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const isUserExist = await User.findOne({ email })

        if (!isUserExist) return next(errorHandler(400, "email is not exist"));

        const validPassword = bcryptjs.compareSync(password, isUserExist.password);

        if (!validPassword) return next(errorHandler(404, "Incorrect username or password"));

        const cookie = jwt.sign({ _id: isUserExist._id }, process.env.JWT_SECREATE_KEY);

        const { password: xyz, ...userData } = isUserExist._doc;
        res.cookie("cookie", cookie, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 10000
        }).status(200).json(userData)

    } catch (error) {
        next(`Error While sign in ${error}`);
    }
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(404, "You can updatye only your account"));
    }
    try {
        if (req.body.email) {
            const isUserExist = await User.findOne({ email: req.body.email });
            if (isUserExist) return next(errorHandler(400, "email already register please enter another email"));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,

            }
        });
        const { password, ...data } = updatedUser._doc;

        res.status(201).json(data)
    } catch (error) {
        console.log(`Error while updating user: ${error}`)
        next();
    }
}


export const logout = async (req, res, next) => {
    try {

        res.clearCookie('cookie').status(200).json({
            success: true,
            message: "User Logout successfuly"
        })
    } catch (error) {
        console.log(`Error While logout: ${error}`)
        next();
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(404, "You can delete only your account"));
    }

    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        res.clearCookie('cookie').status(200).json({
            success: true,
            message: "User Deleted paramanantly"
        });

    } catch (error) {
        console.log(`Error While deleting User :${error}`)
        next();
    }
}
