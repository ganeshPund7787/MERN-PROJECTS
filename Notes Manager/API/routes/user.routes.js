import express from "express";
import { deleteUser, googleAuth, logout, signin, signup, updateUser } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/Auth.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);


route.get("/logout", isAuthenticated, logout);

route
    .route("/:id")
    .put(isAuthenticated, updateUser)
    .delete(isAuthenticated, deleteUser);

route.post("/googleAuth", googleAuth);
export default route;