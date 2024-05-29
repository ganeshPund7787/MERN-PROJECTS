import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("currentUser") ?
        JSON.parse(localStorage.getItem("currentUser"))
        : null
    ,
    loading: false,
    isUpdate: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchStart: (state, action) => {
            state.loading = true;
        },
        fetchFail: (state, action) => {
            state.loading = false;
            state.currentUser = null;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        deleteUser: (state, action) => {
            state.currentUser = null;
            localStorage.clear();
        },
        logoutUser: (state, action) => {
            state.currentUser = null;
            localStorage.clear();
        },
        toggleEdit: (state, action) => {
            state.isUpdate = !state.isUpdate;
        },

    }
});

export const { fetchStart, fetchFail, fetchSuccess, deleteUser, logoutUser, toggleEdit } = userSlice.actions;

export default userSlice.reducer;