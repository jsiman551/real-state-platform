import { render, screen } from "@testing-library/react";
import Alert from "../components/alert";
import "@testing-library/jest-dom";

describe("Alert Component", () => {
    it("renders the correct message", () => {
        const message = "This is a test alert!";
        render(<Alert type="info" message={message} />);

        // Check if the message is rendered
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it("applies the correct alert type class", () => {
        const type = "success";
        render(<Alert type={type} message="Success alert" />);

        // Check if the class contains the correct type
        const alertElement = screen.getByText("Success alert").closest("div");
        expect(alertElement).toHaveClass(`alert-${type}`);
    });

    it("applies additional classes passed via className", () => {
        const customClass = "custom-class";
        render(<Alert type="error" message="Error alert" className={customClass} />);

        // Check if the additional class is applied
        const alertElement = screen.getByText("Error alert").closest("div");
        expect(alertElement).toHaveClass(customClass);
    });
});
