import { DropdownProps } from "../../types";

const Dropdown: React.FC<DropdownProps> = ({
    label,
    fieldName,
    value,
    min,
    max,
    onFilterChange
}) => {
    const createDropdownItems = () => {
        const items = [];
        for (let i = min; i <= max; i++) {
            items.push(
                <li key={i}>
                    <a
                        role="button"
                        className="hover:bg-primary hover:text-white"
                        onClick={() => onFilterChange(fieldName, i)}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return items;
    };

    return (
        <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-primary m-1">
                {label}: <span className="badge ml-2">{value}</span>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                {createDropdownItems()}
            </ul>
        </div>
    );
};

export default Dropdown;
