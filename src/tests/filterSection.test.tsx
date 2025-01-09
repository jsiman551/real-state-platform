import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FilterSection from "../components/filter-section";

const mockStore = configureStore();

describe("FilterSection Component", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let store: any;

    beforeEach(() => {
        store = mockStore({
            listings: {
                ranges: {
                    Bedrooms: { min: 1, max: 5 },
                    Bathrooms: { min: 1, max: 4 },
                    Parking: { min: 0, max: 3 },
                    "Sale Price": { min: 100000, max: 1000000 },
                },
                filters: {
                    Bedrooms: 3,
                    Bathrooms: 2,
                    Parking: 1,
                    "Sale Price": 500000,
                },
            },
        });
    });

    it("renders dropdowns and slider with correct initial values", () => {
        render(
            <Provider store={store}>
                <FilterSection />
            </Provider>
        );

        // Check dropdown labels and values
        expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
        expect(screen.getByText(/Bathrooms/i)).toBeInTheDocument();
        expect(screen.getByText(/Parking/i)).toBeInTheDocument();
        expect(screen.getByText(/\$500,000/i)).toBeInTheDocument();
    });

    it("updates local state on dropdown change", () => {
        render(
            <Provider store={store}>
                <FilterSection />
            </Provider>
        );

        const dropdownButton = screen.getByText(/Bedrooms/i).closest("label");
        fireEvent.click(dropdownButton!);

        const options = screen.getAllByRole("button", { name: "4" });
        const targetOption = options[0];
        fireEvent.click(targetOption);

        expect(screen.getByText(/Bedrooms/i).nextSibling).toHaveTextContent("4");
    });

    it("updates local state on slider change", () => {
        render(
            <Provider store={store}>
                <FilterSection />
            </Provider>
        );

        const slider = screen.getByRole("slider", { name: /Sale Price/i });
        fireEvent.change(slider, { target: { value: 800000 } });

        expect(screen.getByText(/\$800,000/i)).toBeInTheDocument();
    });

    it("dispatches updated filters on Search button click", () => {
        render(
            <Provider store={store}>
                <FilterSection />
            </Provider>
        );

        const searchButton = screen.getByRole("button", { name: /Search/i });
        fireEvent.click(searchButton);

        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: "listings/setFilters",
            payload: { name: "Bedrooms", value: 3 },
        });
    });
});
