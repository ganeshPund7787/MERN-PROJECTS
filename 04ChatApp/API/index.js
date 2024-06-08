import express from "express";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The port is running on ${port}`)
});
