import { render, screen } from "@testing-library/react";
import EmptyState from "../components/empty-state";

describe("EmptyState Component", () => {
    it("renders the empty state message", () => {
        render(<EmptyState />);

        // Assert the main message is displayed
        expect(screen.getByText(/No listings found/i)).toBeInTheDocument();

        // Assert the secondary message is displayed
        expect(screen.getByText(/Try adjusting your filters or check back later/i)).toBeInTheDocument();
    });

    it("applies the correct styles to the component", () => {
        render(<EmptyState />);

        const container = screen.getByText(/No listings found/i).closest("div");
        expect(container).toHaveClass("text-center py-10");

        const mainMessage = screen.getByText(/No listings found/i);
        expect(mainMessage).toHaveClass("text-lg font-semibold");

        const secondaryMessage = screen.getByText(/Try adjusting your filters/i);
        expect(secondaryMessage).toHaveClass("text-gray-500");
    });
});
