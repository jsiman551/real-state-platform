import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/back-button";

// Mock useNavigate
vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
}));

describe("BackButton Component", () => {
    it("navigates back when clicked", async () => {
        const mockNavigate = vi.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate); // Use mocked function

        render(<BackButton />);

        const button = screen.getByRole("button", { name: /back/i });
        await userEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
