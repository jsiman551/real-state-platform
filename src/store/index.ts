import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./slices/listingsSlice";
import savedPropertiesReducer from "./slices/savedPropertiesSlice";

const store = configureStore({
    reducer: {
        listings: listingsReducer,
        savedProperties: savedPropertiesReducer,
    },
});

// `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
