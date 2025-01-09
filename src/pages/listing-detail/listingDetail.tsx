import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ListingType } from "../../types";
import ContactForm from "../../components/contact-form/contactForm";
import BackButton from "../../components/back-button";
import { addProperty } from "../../store/slices/savedPropertiesSlice";
import Modal from "../../components/modal";

const ListingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the ID from the URL
    const dispatch = useDispatch();
    const { listings } = useSelector((state: RootState) => state.listings);
    const { savedProperties } = useSelector((state: RootState) => state.savedProperties);

    // Fetch the specific listing from Redux store
    const listingDetail = listings.find((item: ListingType) => item.Id === parseInt(id || ""));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveProperty = () => {
        if (listingDetail) {
            dispatch(addProperty(listingDetail));
            setIsModalOpen(true);
        }
    };

    if (!listingDetail) {
        return <div className="text-center text-lg font-semibold">Listing not found.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row p-6 bg-base-100 shadow-xl rounded-lg max-w-4xl mx-auto">
            {/* Listing Details Section */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{listingDetail.Title}</h2>
                <p className="text-gray-500">{listingDetail.Location}</p>
                <div className="text-lg font-bold my-4">
                    ${listingDetail["Sale Price"].toLocaleString()}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    Date Listed:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }).format(new Date(listingDetail.DateListed))}
                </p>
                <img
                    src={listingDetail.PictureURL}
                    alt={listingDetail.Title}
                    className="bg-blue-300 h-64 w-full mb-4"
                />
                <div className="grid grid-cols-5 gap-2 mb-4 text-center">
                    <div>
                        <strong>{listingDetail.Bedrooms}</strong>
                        <p className="text-sm text-gray-500">BED</p>
                    </div>
                    <div>
                        <strong>{listingDetail.Bathrooms}</strong>
                        <p className="text-sm text-gray-500">BATH</p>
                    </div>
                    <div>
                        <strong>{listingDetail.Parking}</strong>
                        <p className="text-sm text-gray-500">PARKING</p>
                    </div>
                    <div>
                        <strong>{listingDetail.Sqft}</strong>
                        <p className="text-sm text-gray-500">SQFT</p>
                    </div>
                    <div>
                        <strong>{listingDetail.YearBuilt}</strong>
                        <p className="text-sm text-gray-500">YEAR BUILT</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{listingDetail.Description}</p>

                <div className="flex gap-4 justify-center md:justify-start">
                    <BackButton />
                    <button className="btn btn-primary" onClick={handleSaveProperty}>
                        Save Property
                    </button>
                </div>
                <div className="divider md:hidden my-6" />
            </div>

            {/* Contact Agent Form Section */}
            <ContactForm />

            {/* Saved Properties Modal */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Saved Properties"
                >
                    {savedProperties.length > 0 ? (
                        <ul className="space-y-2">
                            {savedProperties.map((property) => (
                                <li key={property.Id} className="mb-2">
                                    <span className="font-medium">{property.Title}</span> - $
                                    {property["Sale Price"].toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No saved properties yet!</p>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default ListingDetails;
