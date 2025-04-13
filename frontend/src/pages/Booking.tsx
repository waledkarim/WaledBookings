import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import {v4 as uuidv4} from 'uuid';

const Booking = () => {

  const search = useSearchContext();
  const { hotelId } = useParams();
  const BASE_URL = window.location.origin;
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  console.log(BASE_URL);

  useEffect(() => {

    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }

  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery("fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery("fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const {data: paymentURL, isLoading} = useQuery("fetchPaymentURL",
    () => apiClient.fetchPaymentURL(
      {
        tran_id: `waled-${uuidv4()}`,
        success_url: `${BASE_URL}/payment-success`,
        fail_url: `${BASE_URL}/payment-failed`,
        cancel_url: `${BASE_URL}/payment-cancelled`,
        amount: 10,
        cus_name: currentUser?.firstName as string,
        cus_email: currentUser?.email as string,
      },
    ),
    {
      enabled: !!currentUser
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] py-5 gap-y-3">

      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {
        currentUser  && 
          paymentURL &&
            paymentURL.result === "true" ? (

              <BookingForm
                hotel={hotel}
                numberOfNights={numberOfNights}
                currentUser={currentUser}
                paymentURL={paymentURL.payment_url}
                isLoading={isLoading}
              />

          ) : "Nothing to show"
      }
      
    </div>
  );
};

export default Booking;