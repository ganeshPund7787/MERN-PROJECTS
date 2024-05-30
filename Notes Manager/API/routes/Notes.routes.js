import express from "express"
import { deleteNotes, getAll, multipleDelete, newNotes, searchNote, toggleComplete, updateNotes } from "../controllers/notes.controller.js";
import { isAuthenticated } from "../middleware/Auth.js";

const route = express.Router();

route.post("/new", isAuthenticated, newNotes)

route.get("/all", isAuthenticated, getAll);

route
    .route("/:id")
    .put(isAuthenticated, updateNotes)
    .delete(isAuthenticated, deleteNotes)

route.put("/toggle/:id", toggleComplete);

route.post("/deleteArr", multipleDelete)

route.post('/search', isAuthenticated, searchNote);
export default route;