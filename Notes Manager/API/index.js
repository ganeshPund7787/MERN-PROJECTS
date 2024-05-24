import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import route from "./routes/user.routes.js"
config({ path: "./config/.env" });
import { mongoConnection } from "./data/data.js"
import { middaleware } from "./middleware/user.middleware.js";
import notesRoute from "./routes/Notes.routes.js"

mongoConnection();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user/", route);
app.use("/api/notes/", notesRoute);

app.use(middaleware);
app.listen(process.env.PORT, () => {
    console.log(`server is working on ${process.env.PORT}`)
});