import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    recycleArr: []
}

const recycleSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setRecycleArr: (state, action) => {
            state.recycleArr.push(action.payload);
        },
        unChecked: (state, action) => { }
    }
});

export const { setRecycleArr, unChecked } = recycleSlice.actions;


export default recycleSlice.reducer;