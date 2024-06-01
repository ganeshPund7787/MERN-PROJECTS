import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../app/features/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})