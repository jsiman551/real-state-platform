import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/modal";

describe("Modal Component", () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        title: "Test Modal",
        children: <p>Modal content</p>,
    };

    it("renders the modal when `isOpen` is true", () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();
        expect(screen.getByText(/Modal content/i)).toBeInTheDocument();
    });

    it("does not render the modal when `isOpen` is false", () => {
        render(<Modal {...defaultProps} isOpen={false} />);
        expect(screen.queryByText(/Test Modal/i)).not.toBeInTheDocument();
    });

    it("calls the `onClose` function when the Close button is clicked", () => {
        render(<Modal {...defaultProps} />);
        const closeButton = screen.getByRole("button", { name: /close/i });
        fireEvent.click(closeButton);
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("renders the children content correctly", () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText(/Modal content/i)).toBeInTheDocument();
    });

    it("renders the title correctly", () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();
    });
});
