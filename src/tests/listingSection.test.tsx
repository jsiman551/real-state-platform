import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ListingsSection from "../components/listing-section";
import { BrowserRouter } from "react-router-dom";

// Mock store setup
const mockStore = configureStore([]);

describe("ListingsSection", () => {
    it("renders EmptyState when there are no listings and no error", () => {
        const store = mockStore({
            listings: { filteredListings: [], error: null },
        });

        render(
            <Provider store={store}>
                <ListingsSection />
            </Provider>
        );

        expect(screen.getByText(/No listings found/i)).toBeInTheDocument();
    });

    it("renders an error message if there is an error", () => {
        const store = mockStore({
            listings: { filteredListings: [], error: "An error occurred" },
        });

        render(
            <Provider store={store}>
                <ListingsSection />
            </Provider>
        );

        expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });

    it("renders a grid of listings", () => {
        const store = mockStore({
            listings: {
                filteredListings: [
                    {
                        Id: "1",
                        ThumbnailURL: "https://via.placeholder.com/150",
                        Title: "Sample Listing",
                        Location: "Sample City",
                        Bedrooms: 2,
                        Bathrooms: 1,
                        Parking: "Available",
                        "Sale Price": 250000,
                    },
                ],
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ListingsSection />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText("Sample Listing")).toBeInTheDocument();
        expect(screen.getByText("Sample City")).toBeInTheDocument();
        expect(screen.getByText(/2 beds/i)).toBeInTheDocument();
        expect(screen.getByText(/\$250,000/i)).toBeInTheDocument();
    });
});
