import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../components/contact-form";

describe("ContactForm Component", () => {
    it("renders the form correctly", () => {
        render(<ContactForm />);
        expect(screen.getByPlaceholderText(/Full Name \*/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email \*/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Phone Number \*/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Comments \*/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Contact Now/i })).toBeInTheDocument();
    });

    it("shows validation errors for empty fields", async () => {
        render(<ContactForm />);
        const submitButton = screen.getByRole("button", { name: /Contact Now/i });
        await userEvent.click(submitButton);

        expect(await screen.findByText(/Full Name is required./i)).toBeInTheDocument();
        expect(await screen.findByText(/Email is required./i)).toBeInTheDocument();
        expect(await screen.findByText(/Phone Number must contain only numbers./i)).toBeInTheDocument();
        expect(await screen.findByText(/Comments cannot be empty./i)).toBeInTheDocument();
    });

    it("submits the form and shows success notification", async () => {
        render(<ContactForm />);

        // Fill out form
        await userEvent.type(screen.getByPlaceholderText(/Full Name \*/i), "John Doe");
        await userEvent.type(screen.getByPlaceholderText(/Email \*/i), "john@example.com");
        await userEvent.type(screen.getByPlaceholderText(/Phone Number \*/i), "1234567890");
        await userEvent.type(screen.getByPlaceholderText(/Comments \*/i), "Looking forward to working with you!");

        // Submit the form
        const submitButton = screen.getByRole("button", { name: /Contact Now/i });
        await userEvent.click(submitButton);

        // Check for success notification
        expect(await screen.findByText(/Message sent successfully!/i)).toBeInTheDocument();

        // Ensure form resets
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Full Name \*/i)).toHaveValue("");
            expect(screen.getByPlaceholderText(/Email \*/i)).toHaveValue("");
            expect(screen.getByPlaceholderText(/Phone Number \*/i)).toHaveValue("");
            expect(screen.getByPlaceholderText(/Comments \*/i)).toHaveValue("");
        });
    });
});
