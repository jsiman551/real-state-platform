export type ListingType = {
    Id: number;
    DateListed: string;
    Title: string;
    Description: string;
    "Sale Price": number;
    ThumbnailURL: string;
    PictureURL: string;
    Location: string;
    Sqft: number;
    Bedrooms: number;
    Bathrooms: number;
    Parking: number;
    YearBuilt: number;
};

export type RangesType = {
    Bedrooms: { min: number; max: number };
    Bathrooms: { min: number; max: number };
    Parking: { min: number; max: number };
    "Sale Price": { min: number; max: number };
};

export type DropdownProps = {
    label: string;
    fieldName: string;
    value: number;
    min: number;
    max: number;
    onFilterChange: (field: string, value: number) => void;
};

export type FormValues = {
    fullName: string;
    email: string;
    phoneNumber: string;
    comments: string;
};

export type AlertProps = {
    type: "success" | "error" | "warning" | "info";
    message: string;
    className?: string;
};

export type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
}

export type ListingsStateType = {
    listings: ListingType[];
    filteredListings: ListingType[];
    filters: { [key: string]: number };
    ranges: RangesType;
    isLoading: boolean;
    error: string | null;
};

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
