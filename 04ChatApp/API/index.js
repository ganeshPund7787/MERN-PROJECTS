import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/auth.router.js"
import { mongoConnection } from "./database/data.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();
mongoConnection();

const app = express();
app.use(express.json());

app.use('/api/auth', userRouter)

app.use(errorMiddleware);

const port = process.env.PORT || 4999;
app.listen(port, () => {
    console.log(`The port is running on ${port}`)
});


