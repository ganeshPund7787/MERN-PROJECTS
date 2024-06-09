import express from "express"
import { sendMessage } from "../controllers/message.controller.js"
import { Authenticated } from "../middleware/Auth.js";

const router = express.Router();

router.post('/send/:id', Authenticated, sendMessage)

export default router;
