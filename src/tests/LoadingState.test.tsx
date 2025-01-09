import { render, screen } from "@testing-library/react";
import LoadingState from "../components/loading-state";

describe("LoadingState Component", () => {
    it("renders the loading spinner", () => {
        render(<LoadingState />);

        // Assert that the loading spinner is present
        const spinner = screen.getByRole("status", { hidden: true });
        expect(spinner).toHaveClass("loading loading-ring loading-lg");
    });

    it("applies the correct container styles", () => {
        render(<LoadingState />);

        // Assert the outer container has correct styles
        const container = screen.getByRole("status", { hidden: true }).closest("div");
        expect(container).toHaveClass("flex items-center justify-center h-screen");
    });
});
