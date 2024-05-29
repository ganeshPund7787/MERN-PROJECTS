import mongoose from "mongoose";
import { Notes } from "../models/Notes.models.js";
import { errorHandler } from "../utils/error.handler.js"

export const newNotes = async (req, res, next) => {
    try {
        const { title, desc } = req.body;

        if (title === "" || desc === "") {
            return next(errorHandler(400, "You must write something"));
        }

        const newNotes = new Notes({
            title, desc, user: req.user
        })

        await newNotes.save();

        res.status(202).json({
            success: true,
            message: "Note create successfully"
        })
    } catch (error) {
        console.log(`Error while create new Notes: ${error}`)
        next()
    }
}

export const updateNotes = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedNotes = await Notes.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                desc: req.body.desc
            }
        }, { new: true });

        res.status(201).json({
            success: true,
            message: "User successfully update",
            updatedNotes
        })
    } catch (error) {
        console.log(`Error while update Notes : ${error}`)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const AllNotes = await Notes.find({ user: userId });

        res.status(200).json(AllNotes)

    } catch (error) {
        console.log(`Error While getAll Notes : ${error}`)
        next();
    }
}

export const deleteNotes = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Notes.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })
    } catch (error) {
        console.log(`Error while delete notes : ${error}`)
    }
}

export const toggleComplete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);

        note.isDelete = !note.isDelete;

        await note.save();


        res.status(200).json({
            success: true,
            message: "Task complete"
        })
    } catch (error) {
        console.log(`Error while toggle notes completed :B ${error}`);
    }
}

export const multipleDelete = async (req, res, next) => {
    try {
        const { deleteArr } = req.body;
        console.log(deleteArr)

        if (!Array.isArray(deleteArr) || deleteArr.length === 0) {
            return res.status(400).json({ message: 'Invalid request, array of ids required' });
        }
        const objectIds = deleteArr.map(id => new mongoose.Types.ObjectId(id));

        await Notes.deleteMany({ _id: { $in: objectIds } });
        res.status(200).json({ message: `${deleteArr.length} notes deleted` })

    } catch (error) {
        console.log(`Error while multipleDellete :  ${error}`)
    }
}
