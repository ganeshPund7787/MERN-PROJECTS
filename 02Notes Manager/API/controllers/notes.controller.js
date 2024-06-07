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

        const updatedNotes = await Notes.findById(id);

        if (req.body.title) {
            updatedNotes.title = req.body.title
        }
        if (req.body.desc) {
            updatedNotes.desc = req.body.desc
        }

        await updatedNotes.save()

        res.status(201).json({
            success: true,
            message: "note successfully update",
            updatedNotes
        })
    } catch (error) {
        console.log(`Error while update Notes : ${error}`)
        next(error)
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
        next();
    }
}

export const toggleComplete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);

        note.isPin = !note.isPin
        note.isDelete = !note.isDelete;
        note.title = note.title
        await note.save();


        res.status(200).json({
            success: true,
            message: "select"
        })
    } catch (error) {
        console.log(`Error while toggle notes completed : ${error}`);
        next(error)
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
        next(error)
    }
}

export const togglePin = async (req, res, next) => {

    try {
        const { id } = req.params;
        const note = await Notes.findById(id);

        note.isPin = !note.isPin;

        await note.save();


        res.status(200).json({
            success: true,
            message: "pin task"
        })
    } catch (error) {
        console.log(`Error while toggle notes completed : ${error}`);
        next(error)
    }

}

export const searchNote = async (req, res, next) => {

    try {
        const { title } = req.query;
        const id = req.user._id;

        const searchNotes = await Notes.find({ $and: [{ user: id }, { title: { $regex: title, $options: 'i' } }] });
        console.log(searchNotes);
        res.status(200).json(searchNotes)
    } catch (error) {
        console.log(`Error while search Note : ${error}`)
        next();
    }
}


export const sortByUpdatedAt = async (req, res, next) => {
    try {
        const sortNote = await Notes.find({ user: req.user._id }).sort({ updatedAt: -1 })
        res.status(200).json(sortNote);
    } catch (error) {
        console.log(`Error while sortByUpdate : ${error}`)
    }
}

