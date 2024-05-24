import { Notes } from "../models/Notes.models.js";

export const newNotes = async (req, res, next) => {
    try {
        const { title, desc } = req.body;

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
        const AllNotes = await Notes.find();

        res.status(200).json(AllNotes)

    } catch (error) {
        console.log(`Error While getAll User`)
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
        console.log(note.isComplete)

        note.isComplete = !note.isComplete;

        await note.save();

        console.log(note.isComplete)
        res.status(200).json({
            success: true,
            message: "Task complete"
        })
    } catch (error) {
        console.log(`Error while toggle notes completed :B ${error}`);
    }
}