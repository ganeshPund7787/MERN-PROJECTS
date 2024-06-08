import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/auth.router.js"
import { mongoConnection } from "./database/data.js";

dotenv.config();
mongoConnection();


const app = express();
app.use(express.json());

app.use('/api/auth', userRouter)


app.get("/", (req, res) => {
    res.json("Hello");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The port is running on ${port}`)
});


