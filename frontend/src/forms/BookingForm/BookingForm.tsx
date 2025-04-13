import { useForm } from "react-hook-form";
import {
  HotelType,
  UserType,
} from "../../../../backend/src/types/types";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  currentUser: UserType,
  numberOfNights: number,
  hotel: HotelType,
  paymentURL: string,
  isLoading: boolean
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, numberOfNights, hotel, isLoading, paymentURL }: Props) => {


  const search = useSearchContext();
  const { hotelId } = useParams();

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    localStorage.setItem("pendingBooking", JSON.stringify(formData));
    window.location.href = paymentURL;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-500 p-5"
    >

      {/* Heading */}
      <div className="form-heading">Confirm Your Details</div>

      {/* First name and last name section */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <label className="input-label">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="input-label">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      {/* Price summary section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
              BDT&nbsp;
              {
                numberOfNights * hotel?.pricePerNight
              }
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          disabled={isLoading}
          type="submit"
          className="btn-blue"
        >
           {
            isLoading ? <AiOutlineLoading3Quarters className="w-full animate-spin"/> : "Confirm Booking"
           }
        </button>
      </div>
    </form>
  );
};

export default BookingForm;