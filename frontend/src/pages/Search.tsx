import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultCardSkeleton from "../components/skeletons/SearchResultCardSkeleton";
// import SearchResultsCard from "../components/SearchResultsCard";
// import Pagination from "../components/Pagination";
// import StarRatingFilter from "../components/StarRatingFilter";
// import HotelTypesFilter from "../components/HotelTypesFilter";
// import FacilitiesFilter from "../components/FacilitiesFilter";
// import PriceFilter from "../components/PriceFilter";
import { FaFilter } from "react-icons/fa";
import SpecialContainer from "../components/SpecialContainer";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StartRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";


const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isFetching } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <>
      {/* Sidebar */}
      {
        <SpecialContainer open={open} onClose={() => setOpen(false)}>
            <div className="relative w-full h-screen">
                <div className={`bg-blue-50 rounded-lg border border-slate-300 transition-all duration-300 ease-in-out absolute inset-y-0 ${open ? "right-0" : "-right-full"} overflow-auto w-2/3 p-3`}>

                    <div className="space-y-5">
                      <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                      </h3>
                      <StarRatingFilter 
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                      />
                      <HotelTypesFilter 
                          selectedHotelTypes={selectedHotelTypes}
                          onChange={handleHotelTypeChange}
                      />
                      <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange} 
                      />
                      <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value) => setSelectedPrice(value)} 
                      />
                    </div>

                </div>
            </div>
        </SpecialContainer>
      }

      {/* Main section */}
      <div className="py-6 lg:flex lg:gap-x-3">

          {/* Button for small screens */}
          <button onClick={() => setOpen(true)} className="btn-blue flex items-center gap-x-2 mb-2 lg:hidden">
            Filter <FaFilter size={10}/>
          </button>

          {/* Filter section in large screens */}
          <div className="hidden rounded-lg border border-slate-300 lg:block lg:p-5 lg:h-fit lg:sticky lg:top-20 lg:w-1/4">

              <div className="space-y-5">
                  <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter by:
                  </h3>
                  <StarRatingFilter 
                    selectedStars={selectedStars}
                    onChange={handleStarsChange}
                  />
                  <HotelTypesFilter 
                      selectedHotelTypes={selectedHotelTypes}
                      onChange={handleHotelTypeChange}
                  />
                  <FacilitiesFilter
                    selectedFacilities={selectedFacilities}
                    onChange={handleFacilityChange} 
                  />
                  <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value) => setSelectedPrice(value)} 
                  />
              </div>

          </div>

          {
            isFetching ? 
              <SearchResultCardSkeleton /> :
              hotelData ?
              <div className="w-full flex flex-col gap-y-2 lg:w-3/4">

                  <div className="lg:flex lg:justify-between lg:items-center">
                      {/* Results heading */}
                      <div className="text-lg font-bold">
                          {hotelData.pagination.total} Hotels found
                          {search.destination ? ` in ${search.destination}` : ""}
                      </div>

                      {/* Sort select field */}
                      <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="w-full p-2 border rounded-md lg:w-auto"
                      >
                          <option value="">Sort By</option>
                          <option value="starRating">Star Rating</option>
                          <option value="pricePerNightAsc">
                            Price Per Night (low to high)
                          </option>
                          <option value="pricePerNightDesc">
                            Price Per Night (high to low)
                          </option>
                      </select>

                  </div>
                  {
                    hotelData.data.map((hotel) => (
                      <SearchResultCard hotel={hotel}/>
                    ))
                  }

                  {
                    hotelData.data.length >= 5 ? 
                    <Pagination 
                      page={hotelData?.pagination.page}
                      pages={hotelData.pagination.pages}
                      onPageChange={(pageNo) => setPage(pageNo)}
                    /> :
                    <div/>
                  }


              </div> :
              "No Hotels to show..."
          }

          

      </div>
    </>
  );
};

export default Search;