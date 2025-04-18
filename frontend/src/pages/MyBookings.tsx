import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import MyBookingsCardSkeleton from "../components/skeletons/MyBookingsCardSkeleton";

const MyBookings = () => {

  const { data: hotels, isFetching } = useQuery("fetchMyBookings",
    apiClient.fetchMyBookings
  );


  return (
    <div className="py-5">
      {
        isFetching ? <MyBookingsCardSkeleton />
        : (!hotels || hotels.length === 0) ? 
          <div className="flex justify-center items-center py-2">
              <div className="p-5 font-medium border border-black text-center">
                You currently have no bookings
              </div>
          </div>
          :
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">My Bookings</h1>
            {
              hotels.map((hotel) => (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-3 gap-5">
                  <div className="lg:w-full lg:h-[250px]">
                    <img
                      src={hotel.imageUrls[0]}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                    <div className="text-2xl font-bold">
                      {hotel.name}
                      <div className="text-xs font-normal">
                        {hotel.city}, {hotel.country}
                      </div>
                    </div>
                    {
                      hotel.bookings.map((booking) => (
                        <div>
                          <div>
                            <span className="font-bold mr-2">Dates: </span>
                            <span>
                              {new Date(booking.checkIn).toDateString()} -
                              {new Date(booking.checkOut).toDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold mr-2">Guests:</span>
                            <span>
                              {booking.adultCount} adults, {booking.childCount} children
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
};

export default MyBookings;