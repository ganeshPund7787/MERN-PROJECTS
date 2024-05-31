import { configureStore } from "@reduxjs/toolkit"
import userReducers from "./feature/userSlice"
import recycleReducers from "./feature/recycleSlice"

export const store = configureStore({
    reducer: {
        user: userReducers,
        recyle: recycleReducers
    }
})

