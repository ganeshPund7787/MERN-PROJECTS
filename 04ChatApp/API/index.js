import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.router.js"
import messageRoutes from "./routes/message.router.js"
import usersRoutes from "./routes/user.router.js"

import { mongoConnection } from "./database/data.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoConnection();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', usersRoutes)


app.use(errorMiddleware);

const port = process.env.PORT || 4999;
app.listen(port, () => {
    console.log(`The port is running on ${port}`)
});


