import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../middlewares/ErrorFallback";

const ThrowError = () => {
    throw new Error("Test error");
};

describe("ErrorBoundary", () => {
    it("renders fallback UI when an error is thrown", () => {
        render(
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ThrowError />
            </ErrorBoundary>
        );

        // Check if the fallback UI is rendered
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
        expect(screen.getByText(/Test error/i)).toBeInTheDocument();
        expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    });

    it("renders children when no error occurs", () => {
        render(
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <p>Safe Component</p>
            </ErrorBoundary>
        );

        // Check if the normal UI is rendered
        expect(screen.getByText(/Safe Component/i)).toBeInTheDocument();
    });
});
