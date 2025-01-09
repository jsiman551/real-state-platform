import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchListings } from "./store/thunks/listingsThunks";
import { filterListings } from "./store/slices/listingsSlice";
import LoadingState from "./components/loading-state";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterSection from "./components/filter-section";
import ListingsSection from "./components/listing-section";
import ListingDetail from "./pages/listing-detail";

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const { filters, isLoading } = useSelector((state: RootState) => state.listings);

  // Fetch the listings on component mount
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  // Trigger filtering whenever filters change
  useEffect(() => {
    dispatch(filterListings());
  }, [dispatch, filters]);

  if (isLoading) return <LoadingState />;

  return (
    <Router>
      <div className="p-4 max-w-7xl mx-auto">
        <Routes>
          {/* Route for the listings page */}
          <Route
            path="/"
            element={
              <>
                <FilterSection />
                <ListingsSection />
              </>
            }
          />

          {/* Route for the listing detail page */}
          <Route path="/listings/:id" element={<ListingDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
