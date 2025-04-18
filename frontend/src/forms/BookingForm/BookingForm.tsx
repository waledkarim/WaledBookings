import { useForm } from "react-hook-form";
import { useBookingContext } from "../../contexts/BookingContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppContext } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  hotelId: string,
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
};

const BookingForm = () => {

  const {
    totalPrice,
  } = useBookingContext();

  const booking = useBookingContext();
  const {showToast} = useAppContext();
  const { hotelId } = useParams();
  const { data: currentUser, isSuccess, isLoading } = useQuery("fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { handleSubmit, register, reset, } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: booking.adultsCount,
      childCount: booking.childCount,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
    },
  });

  useEffect(() => {

    if (isSuccess && currentUser) {
      reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        adultCount: booking.adultsCount,
        childCount: booking.childCount,
        checkIn: booking.checkIn.toISOString(),
        checkOut: booking.checkOut.toISOString(),
      });
    }

  }, [isSuccess, currentUser, booking]);

  const {mutate, isLoading: isConfirmBookingLoading} = useMutation(apiClient.getPaymentURL, {

    onSuccess: (paymentGatewayURL) => {
      window.location.href = paymentGatewayURL;
    },
    onError: () => {
      showToast({message: "An error occured for SSLCommerz", type: "ERROR"});
    },
    
  })

  const onSubmit = async (formData: BookingFormData) => {

    formData.totalCost = totalPrice;
    formData.hotelId = hotelId as string;
    console.log("formData after confirm booking: ", formData);
    mutate(formData);

  };

  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-500 p-5"
    >

        {/* Heading */}
        <div className="form-heading">Confirm Your Details</div>

        {/* First name, last name and email section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">

          <label className="input-label">
            First Name
            <div className="relative">
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("firstName")}
              />
              {
                isLoading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="
                        animate-spin
                        text-gray-500
                      "
                    />
                  </div>
                )
              }
            </div>
          </label>

          <label className="relative input-label">
            Last Name
            <div className="relative">
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("lastName")}
              />
              {
                isLoading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="
                        animate-spin
                        text-gray-500
                      "
                    />
                  </div>
                )
              }
            </div>
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <div className="relative">
              <input
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
                {...register("email")}
              />
              {
                  isLoading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <AiOutlineLoading3Quarters
                        size={20}
                        className="
                          animate-spin
                          text-gray-500
                        "
                      />
                    </div>
                  )
              }
            </div>
          </label>

        </div>

        {/* Price summary section */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>

          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
                BDT {totalPrice.toLocaleString()}
            </div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={isConfirmBookingLoading}
            type="submit"
            className="btn-blue"
          >
            
              {
                isConfirmBookingLoading ? <AiOutlineLoading3Quarters className="w-full animate-spin"/> : "Confirm Booking"
              }
            
          </button>
        </div>

    </form>
  );
};

export default BookingForm;