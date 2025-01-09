const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-10">
            <p className="text-lg font-semibold">No listings found</p>
            <p className="text-gray-500">
                Try adjusting your filters or check back later for new listings.
            </p>
        </div>
    );
}

export default EmptyState;
