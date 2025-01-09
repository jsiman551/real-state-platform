import { createAsyncThunk } from "@reduxjs/toolkit";
import { ListingType } from "../../types";

// thunk for fetching listings
export const fetchListings = createAsyncThunk<ListingType[]>(
    "listings/fetchListings",
    async () => {
        const response = await fetch("/listings.json");
        if (!response.ok) {
            throw new Error("Failed to fetch listings data");
        }
        const data = await response.json();
        return data;
    }
);
