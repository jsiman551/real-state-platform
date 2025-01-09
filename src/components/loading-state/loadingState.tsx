import React from "react";

const LoadingState: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <span
                className="loading loading-ring loading-lg"
                role="status"
                aria-label="Loading"
            ></span>
        </div>
    );
};

export default LoadingState;
