import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchListings } from "../thunks/listingsThunks";
import { ListingsStateType, RangesType } from "../../types";

const initialState: ListingsStateType = {
    listings: [],
    filteredListings: [],
    filters: {
        Bedrooms: 1,
        Bathrooms: 1,
        Parking: 1,
        "Sale Price": 700000,
    },
    ranges: {
        Bedrooms: { min: 0, max: 0 },
        Bathrooms: { min: 0, max: 0 },
        Parking: { min: 0, max: 0 },
        "Sale Price": { min: 0, max: 0 },
    },
    isLoading: false,
    error: null,
};

// Create the slice
const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<{ name: string; value: number }>) => {
            state.filters[action.payload.name] = action.payload.value;
        },
        calculateRanges: (state) => {
            const fields = ["Bedrooms", "Bathrooms", "Parking", "Sale Price"] as const;
            const ranges: RangesType = {
                Bedrooms: { min: 0, max: 0 },
                Bathrooms: { min: 0, max: 0 },
                Parking: { min: 0, max: 0 },
                "Sale Price": { min: 0, max: 0 },
            };
            fields.forEach((field) => {
                const values = state.listings.map((item) => item[field]);
                ranges[field] = { min: Math.min(...values), max: Math.max(...values) };
            });
            state.ranges = ranges;
        },
        filterListings: (state) => {
            state.filteredListings = state.listings.filter((listing) => {
                return (
                    listing.Bedrooms >= state.filters.Bedrooms &&
                    listing.Bathrooms >= state.filters.Bathrooms &&
                    listing.Parking >= state.filters.Parking &&
                    listing["Sale Price"] <= state.filters["Sale Price"]
                );
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listings = action.payload;
                state.filteredListings = action.payload;
                state.error = null;

                // Dynamically calculate ranges
                listingsSlice.caseReducers.calculateRanges(state);

                // Set filters to default values
                const fields = ["Bedrooms", "Bathrooms", "Parking", "Sale Price"] as const;
                fields.forEach((field) => {
                    if (field === "Sale Price") {
                        state.filters[field] = state.ranges[field].max;
                    } else {
                        state.filters[field] = state.ranges[field].min;
                    }
                });
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch listings";
            });
    },
});

export const { setFilters, filterListings } = listingsSlice.actions;

export default listingsSlice.reducer;
