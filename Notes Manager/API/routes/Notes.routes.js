import express from "express"
import { deleteNotes, getAll, newNotes, toggleComplete, updateNotes } from "../controllers/notes.controller.js";
import { isAuthenticated } from "../middleware/Auth.js";

const route = express.Router();

route.post("/new", isAuthenticated, newNotes)

route.get("/all", getAll);

route
    .route("/:id")
    .put(isAuthenticated, updateNotes)
    .delete(isAuthenticated, deleteNotes)

route.put("/toggle/:id", toggleComplete);

export default route;