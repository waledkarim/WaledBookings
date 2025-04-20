import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useBookingContext } from "../../contexts/BookingContext";
import { HotelType } from "../../../../backend/src/types/types";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import { addDays, isWithinInterval, startOfDay } from "date-fns";

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

// Helper function
const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];

  let currentDate = new Date(startDate);
  let lastDate = new Date(endDate);

  currentDate.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);

  while (currentDate <= lastDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(dates);
  return dates;
};




const GuestInfoForm = ({ hotel, pricePerNight }: Props) => {

  const [highlightWithRanges, setHighlightWithRanges] = useState<Array<{ [key: string]: Date[] }>>([]);
  const booking = useBookingContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelId } = useParams()
  const {watch, register, handleSubmit, control, formState: { errors },} = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: booking.checkIn ? booking.checkIn : undefined,
      checkOut: booking.checkOut ? booking.checkOut : undefined,
      adultCount: booking.adultsCount ? booking.adultsCount : undefined,
      childCount: booking.childCount ? booking.childCount : undefined,
    }
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const totalNoOfNights = Math.ceil(Math.abs((new Date(checkOut)).getTime() - (new Date(checkIn)).getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = Number(pricePerNight * totalNoOfNights);


  const {data: unavailableDates} = useQuery("getUnavailableDates",
    () => apiClient.getUnavailableBookingDates(hotelId as string)
  )
  useEffect(() => {

    if (unavailableDates) {
      let bookedDates: Date[] = [];
  
      unavailableDates.forEach(({ start, end }) => {
        const rangeDates = getDatesBetween(start, end);
        bookedDates = bookedDates.concat(rangeDates);
      });

      const offerDates = [
        addDays(new Date(), 20),
        new Date(2025, 4, 2)
      ];
  
      setHighlightWithRanges([
        {
          "react-datepicker__day--highlighted-booked": bookedDates
        },
        {
          "react-datepicker__day--highlighted-offer": offerDates
        }
      ]);
    }

  }, [unavailableDates]);



  const onSignInClick = (data: GuestInfoFormData) => {

    isNaN(data.childCount) ? data.childCount = 0 : data.childCount;
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
    
    isNaN(data.childCount) ? data.childCount = 0 : data.childCount;
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

  const isBookedDate = (date: Date) => {

  if (!date || !unavailableDates) return false;

  const normalizedDate = startOfDay(date);
  console.log(normalizedDate);

  return unavailableDates.some((booking) => {
    const start = startOfDay(new Date(booking.start));
    const end = startOfDay(new Date(booking.end));
    console.log("startDate",start, "endDate: ",end);
    return isWithinInterval(normalizedDate, { start, end });
  });

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
            <Controller
              control={control}
              name="checkIn"
              rules={{
                required: "Check-in date is required",
                validate: (date) => {

                  if (isBookedDate(date)) {
                    return "This date is booked ❌";
                  }
                  return true;
                  
                }
                }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    if(date) field.onChange(date);
                  }}
                  highlightDates={highlightWithRanges}
                  minDate={new Date()}
                  placeholderText="Select check-in date"
                  className="p-2 w-full border rounded-md focus:outline-none"
                  wrapperClassName="w-full"

                />
              )}
            />
            {
              errors.checkIn && (
                <p className="text-red-500 font-semibold text-sm">{errors.checkIn.message}</p>
              )
            }
          </div>

          {/* CheckOut section */}
          <div>
            <Controller
              control={control}
              name="checkOut"
              rules={{
                required: "Check-out date is required",
                validate: (date) => {

                  if (isBookedDate(date)) {
                    return "This date is booked ❌";
                  }
                  if (checkIn && date <= checkIn) {
                    return "Check-out must be after Check-in";
                  }
                  return true;
                  
                }
                }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    if(date) field.onChange(date);
                  }}
                  highlightDates={highlightWithRanges}
                  minDate={checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                  placeholderText="Select check-out date"
                  className="p-2 w-full rounded-md focus:outline-none"
                  wrapperClassName="w-full"
                />
              )}
            />
            {
              errors.checkOut && (
                <p className="text-red-500 font-semibold text-sm">{errors.checkOut.message}</p>
              )
            }
          </div>

          {/* Adults section */}
          <div className="flex flex-col gap-y-2">

            <label className="items-center flex">
              <input
                className="input focus:outline-none"
                type="number"
                min={1}
                max={20}
                placeholder="Adult count"
                {...register("adultCount", {
                  required: "There must be at least one adult",
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

            <label className="items-center flex">
              <input
                className="input focus:outline-none"
                type="number"
                placeholder="Child count"
                min={0}
                max={15}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {
              errors.childCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.childCount.message}
                </span>
              )
            }
          </div>

          {/* Color Legends */}
          <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-600 rounded-full shadow-md animate-pulse"></span>
                  <span className="text-sm">Booked Dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-600 rounded-full shadow-md animate-pulse"></span>
                  <span className="text-sm">Special Offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-600 rounded-full shadow-md animate-pulse"></span>
                  <span className="text-sm">Holidays</span>
                </div>
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