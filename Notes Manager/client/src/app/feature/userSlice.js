import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("CurrentUser") ?
        JSON.parse(localStorage.getItem("CurrentUser"))
        : null
    ,
    loading: false
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
            currentUser = null;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("CurrentUser", JSON.stringify(action.payload));
        }
    }
});

export const { fetchStart, fetchFail, fetchSuccess } = userSlice.actions;

export default userSlice.reducer;