export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) return next();
    } catch (error) {
        next(error)
    }
}
export const signIn = async (req, res, next) => {
    try {
        res.json("sign in page")
    } catch (error) {
        next(error)
    }
}
export const logout = async (req, res, next) => {
    try {
        res.json("logout in page")
    } catch (error) {
        next(error)
    }
}