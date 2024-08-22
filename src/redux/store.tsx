import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./userSlice.tsx"

export const store = configureStore({
    reducer: {
        "user": userReducer,
    },
})

