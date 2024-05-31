import React from 'react'
import useToastMsg from "../Hooks/useToastMsg.js"

const useNoteEdit = () => {
    const { showToast } = useToastMsg()
    const editNote = async (note) => {

        const res = await fetch(`/api/notes/${note.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                title: note.title,
                desc: note.desc
            })
        });
        const data = await res.json();
        showToast(data);
        return data;
    }

    return { editNote };
}

export default useNoteEdit