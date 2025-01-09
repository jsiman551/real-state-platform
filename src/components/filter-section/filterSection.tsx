import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setFilters } from "../../store/slices/listingsSlice";
import { RangesType } from "../../types";
import Dropdown from "../dropdown";

const FilterSection: React.FC = () => {
    const dispatch = useDispatch();
    const { ranges, filters } = useSelector((state: RootState) => state.listings);

    // Local state to hold filter values until the "Search" button is clicked
    const [localFilters, setLocalFilters] = useState(filters);

    const handleDropdownChange = (fieldName: string, value: number) => {
        setLocalFilters((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSearchClick = () => {
        // Dispatch the updated filters to Redux
        Object.entries(localFilters).forEach(([name, value]) => {
            dispatch(setFilters({ name, value }));
        });
    };

    const fields = [
        { label: "Bedrooms", fieldName: "Bedrooms" },
        { label: "Bathrooms", fieldName: "Bathrooms" },
        { label: "Parking", fieldName: "Parking" },
    ];

    return (
        <div className="card bg-base-200 shadow-md p-4 mb-6">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="flex gap-4 flex-wrap items-center justify-center">
                {fields.map(({ label, fieldName }) => (
                    <Dropdown
                        key={fieldName}
                        label={label}
                        fieldName={fieldName}
                        value={localFilters[fieldName as keyof typeof filters]}
                        min={ranges[fieldName as keyof RangesType].min}
                        max={ranges[fieldName as keyof RangesType].max}
                        onFilterChange={handleDropdownChange}
                    />
                ))}

                {/* Price Range Slider */}
                <div>
                    <label className="block mb-2">
                        Price Range:{" "}
                        <span className="badge badge-primary">
                            ${localFilters["Sale Price"].toLocaleString()}
                        </span>
                    </label>
                    <input
                        type="range"
                        name="Sale Price"
                        min={ranges["Sale Price"].min}
                        max={ranges["Sale Price"].max}
                        value={localFilters["Sale Price"]}
                        onChange={handleSliderChange}
                        className="range range-primary"
                        aria-label="Sale Price"
                    />
                    <div className="flex justify-between text-sm mt-1">
                        <span>${ranges["Sale Price"].min.toLocaleString()}</span>
                        <span>${ranges["Sale Price"].max.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button className="btn btn-secondary" onClick={handleSearchClick}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default FilterSection;
