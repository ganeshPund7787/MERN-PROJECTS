import { User } from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test = (req, res) => {
    res.send('hello')
}


export const updateUser = async (req, res, next) => {
    if (req.user._id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account"))
    }

    try {
        if (req.body.email) {
            const isEmailExist = await User.findOne({ email: req.body.email });
            if (isEmailExist) return next(errorHandler(401, "Email already exist"));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const { id } = req.params

        const updateUser = await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profileImg: req.body.profileImg,
            }
        }, { new: true });

        const { password, ...userData } = updateUser._doc;

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}
