export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        await 
    } catch (error) {
        console.log(`Error While send Message: ${error}`)
        next(error);
    }
}