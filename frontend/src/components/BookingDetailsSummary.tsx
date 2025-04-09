import { HotelType } from "../../../backend/src/types/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {

  return (
    <div className="grid gap-4 rounded-lg border border-slate-500 p-5 h-fit">

      {/* Heading section */}
      <h2 className="text-xl font-bold">Your Booking Details</h2>

      {/* Location section */}
      <div className="border-b py-2">
        <h6>Location:</h6>
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>

      {/* Check-in Check-out sections */}
      <div className="flex flex-col gap-3 lg:justify-between">
        <div>
          <h6>Check-in</h6>
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          <h6>Check-out</h6>
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>

      {/* Total length of stay section */}
      <div className="border-t border-b py-2">
        <h6>Total length of stay:</h6>
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      {/* Guests section */}
      <div>
        <h6>Guests</h6>
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>


    </div>


  );
  
};

export default BookingDetailsSummary;