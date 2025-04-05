import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="mb-32">

      {/* Heading section */}
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-y-2 mb-3 py-3">
        <h1 className="text-2xl font-semibold text-blue-500">My Hotels</h1>
        <button className="btn-blue w-full lg:w-auto">
          <Link
            to="/add-hotel"
            className=""
          >
            Add Hotel
          </Link>
        </button>
      </div>

      {/* All hotels section */}
      <div className="lg:grid lg:grid-cols-1 lg:gap-8">
        {
            hotelData.map((hotel, ind) => (
                // Card Section
                <div
                  key={ind}
                  className="flex flex-col border border-slate-400 rounded-lg p-4"
                >
                  <h2 className="text-2xl font-bold">{hotel.name}</h2>
                  <div className="break-words mb-3">{hotel.description}</div>
                  <div className="mb-3 lg:grid lg:grid-cols-5 lg:gap-2">
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BsMap className="mr-1" />
                        {hotel.city}, {hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BsBuilding className="mr-1" />
                        {hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BiHotel className="mr-1" />
                        {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                        <BiStar className="mr-1" />
                        {hotel.starRating} Star Rating
                        </div>
                  </div>
                  <div className="lg:flex lg:justify-end">
                      <button className="w-full btn-blue lg:w-auto">
                        <Link
                          to={`/edit-hotel/${hotel._id}`}
                          className=""
                        >
                          View Details
                        </Link>
                      </button>
                  </div>
                </div>
              ))
        }
      </div>

    </div>
  );
};

export default MyHotels;