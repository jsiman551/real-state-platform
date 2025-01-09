import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary"
        >
            ← Back
        </button>
    )
}

export default BackButton;
