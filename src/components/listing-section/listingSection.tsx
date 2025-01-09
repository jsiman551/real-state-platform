import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import EmptyState from "../empty-state/emptyState";
import { Link } from "react-router-dom";

const ListingsSection: React.FC = () => {
    const { filteredListings, error } = useSelector(
        (state: RootState) => state.listings
    );

    if (filteredListings.length === 0) {
        return error ? <p className="text-center text-lg font-semibold">
            {error}
        </p> : <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((filteredListings) => (
                <div key={filteredListings.Id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={filteredListings.ThumbnailURL}
                            alt={filteredListings.Title}
                            className="w-full h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{filteredListings.Title}</h2>
                        <p className="text-sm text-gray-500">{filteredListings.Location}</p>
                        <p className="text-sm">
                            {filteredListings.Bedrooms} beds | {filteredListings.Bathrooms} baths | Parking:{" "}
                            {filteredListings.Parking}
                        </p>
                        <p className="text-lg font-bold">
                            ${filteredListings["Sale Price"].toLocaleString()}
                        </p>
                        <div className="card-actions justify-end">
                            <Link to={`/listings/${filteredListings.Id}`} className="btn btn-primary">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListingsSection;
