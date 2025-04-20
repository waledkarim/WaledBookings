import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import MyHotelsCardSkeleton from "../components/skeletons/MyHotelsCardSkeleton";

const MyHotels = () => {
  
  const navigate = useNavigate();
  const { data: hotelData, isFetching } = useQuery("fetchMyHotels",
    apiClient.fetchMyHotels
  );

  return (

    <div className="py-5">
      
      {/* Heading section */}
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-y-2 mb-3 py-3">
        <h1 className="text-2xl font-semibold text-blue-500">My Hotels</h1>
        <button onClick={() => navigate("/add-hotel")} className="btn-blue w-full lg:w-auto">
            Add Hotel
        </button>
      </div>

      {

          isFetching ? <MyHotelsCardSkeleton/>
          
          : hotelData ? 
            <>
              {/* All hotels section */}
              <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-1 lg:gap-8">
                {
                    hotelData.map((hotel, ind) => (
                        // Card Section
                        <div key={ind} className="flex flex-col border border-slate-600 rounded-lg p-4">
                          <h2 className="text-2xl font-bold">{hotel.name}</h2>
                          <div className="break-words mb-3 h-[240px] overflow-auto">{hotel.description}</div>
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
                                <BiHotel className="mr-2" />
                                {hotel.adultCount}A, {hotel.childCount}C
                                </div>
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Star Rating
                                </div>
                          </div>
                          <div className="lg:flex lg:justify-end">
                              <button onClick={() => navigate(`/edit-hotel/${hotel._id}`)} className="w-full btn-blue lg:w-auto">
                                  View Details
                              </button>
                          </div>
                        </div>
                      ))
                }
              </div>
            </>
            :
            <div className="flex justify-center items-center py-2">
              <div className="p-5 font-medium text-center border border-black">You currently have no hotels registered in our system</div>
            </div>
      }

    </div>

  );
};

export default MyHotels;