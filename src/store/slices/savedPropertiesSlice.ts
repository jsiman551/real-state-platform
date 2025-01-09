import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListingType } from "../../types";

// Define the initial state
type SavedPropertiesState = {
    savedProperties: ListingType[];
};

const initialState: SavedPropertiesState = {
    savedProperties: [],
};

const savedPropertiesSlice = createSlice({
    name: "savedProperties",
    initialState,
    reducers: {
        addProperty: (state, action: PayloadAction<ListingType>) => {
            // Avoid duplicates
            const exists = state.savedProperties.find(
                (property) => property.Id === action.payload.Id
            );
            if (!exists) {
                state.savedProperties.push(action.payload);
            }
        },
        removeProperty: (state, action: PayloadAction<number>) => {
            state.savedProperties = state.savedProperties.filter(
                (property) => property.Id !== action.payload
            );
        }
    },
});

export const { addProperty, removeProperty } = savedPropertiesSlice.actions;

export default savedPropertiesSlice.reducer;
