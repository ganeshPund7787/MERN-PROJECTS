import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.route.js"

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDb connected `))
    .catch(() => console.log(`Error while mongoDB : ${console.error()}`))

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log(`The port is running on 3000!`)
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// mv .git ../ => for move repository to parent folder