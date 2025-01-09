import Alert from "../components/alert";
import { ErrorFallbackProps } from "../types";

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-base-content p-4">
            <Alert type="error" message="Something went wrong" className="max-w-md flex justify-center" />
            <p className="text-center mt-4 mb-4">
                <span className="text-sm">Error: {error.message}</span>
            </p>
            <button className="btn btn-primary" onClick={resetErrorBoundary}>
                Try Again
            </button>
        </div>
    );
};

export default ErrorFallback;
