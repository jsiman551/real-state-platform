import React from "react";
import { AlertProps } from "../../types";

const Alert: React.FC<AlertProps> = ({ type, message, className = "" }) => {
    const alertClass = `alert alert-${type} shadow-lg ${className}`;
    return (
        <div className={alertClass}>
            <span>{message}</span>
        </div>
    );
};

export default Alert;
