import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./userSlice.tsx"
// import bikeReducer from "./bikeSlice.tsx";
// import riderReducer from "./riderSlice.tsx";
// import pageTypeReducer from "./pageTypeSlice.tsx"

export const store = configureStore({
    reducer: {
        "user": userReducer,
        // "page_type":pageTypeReducer,
        // "bike":bikeReducer,
        // "rider":riderReducer
    },
})

