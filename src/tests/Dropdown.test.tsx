import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../components/dropdown";

describe("Dropdown Component", () => {
    const mockOnFilterChange = vi.fn();

    const defaultProps = {
        label: "Select",
        fieldName: "exampleField",
        value: 5,
        min: 1,
        max: 10,
        onFilterChange: mockOnFilterChange,
    };

    it("renders the dropdown with the correct label and value", () => {
        render(<Dropdown {...defaultProps} />);

        // Assert the label exists
        expect(screen.getByText(/Select/i)).toBeInTheDocument();

        // Assert the value inside the badge
        const badge = screen.getByText(/5/i, { selector: ".badge" });
        expect(badge).toBeInTheDocument();
    });

    it("renders the correct number of dropdown items", () => {
        render(<Dropdown {...defaultProps} />);
        const dropdownItems = screen.getAllByRole("button");
        expect(dropdownItems).toHaveLength(10); // Min=1, Max=10
    });

    it("triggers the onFilterChange callback with the correct arguments when an item is clicked", () => {
        render(<Dropdown {...defaultProps} />);

        // Open the dropdown and click an item
        const dropdownItem = screen.getByText("3");
        fireEvent.click(dropdownItem);

        // Ensure the callback is called with the correct arguments
        expect(mockOnFilterChange).toHaveBeenCalledWith("exampleField", 3);
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    });

    it("applies the correct styles to the dropdown and items", () => {
        render(<Dropdown {...defaultProps} />);

        // Check for label styles
        const label = screen.getByText(/Select/i).closest("label");
        expect(label).toHaveClass("btn btn-primary");

        // Check for item hover styles
        const dropdownItem = screen.getByText("3");
        expect(dropdownItem).toHaveClass("hover:bg-primary hover:text-white");
    });
});
