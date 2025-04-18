import BookingForm from "../forms/BookingForm/BookingForm";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { BookingContextProvider } from "../contexts/BookingContext";

const Booking = () => {

  const BASE_URL = window.location.origin;
  console.log(BASE_URL);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] py-5 gap-5">

    <BookingContextProvider>

        <BookingDetailsSummary/>
        <BookingForm/>
        
    </BookingContextProvider>
      
    </div>
  );
};

export default Booking;