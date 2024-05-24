import { configureStore } from "@reduxjs/toolkit"
import userReducers from "./feature/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducers
    }
})

