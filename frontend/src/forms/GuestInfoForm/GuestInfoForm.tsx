import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingContext } from "../../contexts/BookingContext";
import { HotelType } from "../../../../backend/src/types/types";

type Props = {
  hotel: HotelType;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotel, pricePerNight }: Props) => {
  
  const booking = useBookingContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      adultCount: booking.adultsCount,
      childCount: booking.childCount
    }
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const totalNoOfNights = Math.ceil(Math.abs((new Date(checkOut)).getTime() - (new Date(checkIn)).getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = Number(pricePerNight * totalNoOfNights);


  const onSignInClick = (data: GuestInfoFormData) => {

    booking.saveBookingValues(
      totalPrice,
      totalNoOfNights,
      data.adultCount,
      data.checkIn,
      data.checkOut,
      data.childCount,
      hotel.name,
      hotel.city,
      hotel.country
    );
    navigate("/sign-in", { state: { from: location } });

  };

  const onSubmit = (data: GuestInfoFormData) => {

    booking.saveBookingValues(
      totalPrice,
      totalNoOfNights,
      data.adultCount,
      data.checkIn,
      data.checkOut,
      data.childCount,
      hotel.name,
      hotel.city,
      hotel.country
    );
    navigate(`/hotel/${hotel._id}/booking`);

  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">

      {/* Price heading */}
      <h3 className="text-md font-bold">BDT {pricePerNight}</h3>

      {/* The actual form */}
      <form
        onSubmit={
          isLoggedIn === "success" ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">

          {/* CheckIn section */}
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          {/* CheckOut section */}
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          {/* Adults section */}
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {
              errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.adultCount.message}
                </span>
              )
            }
          </div>

          {
            isLoggedIn === "success" ? (
              <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                Book Now
              </button>
            ) : (
              <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                Sign in to Book
              </button>
            )
          }

        </div>
      </form>
      
    </div>
  );
};

export default GuestInfoForm;