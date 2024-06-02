import express from "express";
import { deleteUser, logoutUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);

router.get('/logout', logoutUser);

router.route("/:id")
    .put(verifyUser, updateUser)
    .delete(verifyUser, deleteUser)



export default router;