import React, { useContext, useState } from "react"

type BookingContext = {
    totalPrice: number,
    adultsCount: number,
    checkIn: Date,
    checkOut: Date
    childCount: number
    totalNumberOfNights: number,
    hotelName: string,
    hotelCity: string,
    hotelCountry: string,
    removeBookingValues: () => void,
    saveBookingValues: (
        totalPrice: number,
        totalNumberOfNights: number,
        adultsCount: number,
        checkIn: Date,
        checkOut: Date,
        childCount: number,
        hotelName: string,
        hotelCity: string,
        hotelCountry: string,
    ) => void,
}

const BookingContext = React.createContext<BookingContext | undefined>(undefined);

export const BookingContextProvider = ({ children }: {children: React.ReactNode}) => {

    const [hotelName, setHotelName] = useState<string>(
        () => sessionStorage.getItem("hotelName") || ""
    );
    const [hotelCity, setHotelCity] = useState<string>(
        () => sessionStorage.getItem("hotelCity") || ""
    );
    const [hotelCountry, setHotelCountry] = useState<string>(
        () => sessionStorage.getItem("hotelCountry") || ""
    );
    

    const [totalPrice, setTotalPrice] = useState<number>(
        () => Number(sessionStorage.getItem("totalPrice")) || 0
    );
    const [totalNumberOfNights, setTotalNumberOfNights] = useState<number>(
        () => Number(sessionStorage.getItem("totalNumberOfNights")) || 0
    );
    const [adultsCount, setAdultsCount] = useState<number>(
        () => Number(sessionStorage.getItem("adultsCount")) || 0
    );
    const [checkIn, setCheckIn] = useState<Date>(
        () => new Date(sessionStorage.getItem("checkIn") || new Date())
    );
    const [checkOut, setCheckOut] = useState<Date>(
        () => new Date(sessionStorage.getItem("checkOut") || new Date())
    );
    const [childCount, setChildCount] = useState<number>(
        () => Number(sessionStorage.getItem("childCount")) || 0
    );

    const saveBookingValues = (totalPrice: number, totalNumberOfNights: number, adultsCount: number, checkIn: Date, checkOut: Date, childCount: number, hotelName: string, hotelCity: string, hotelCountry: string) => {

        setTotalPrice(totalPrice);
        sessionStorage.setItem("totalPrice", totalPrice.toString());

        setTotalNumberOfNights(totalNumberOfNights);
        sessionStorage.setItem("totalNumberOfNights", totalNumberOfNights.toString());

        setAdultsCount(adultsCount);
        sessionStorage.setItem("adultsCount", adultsCount.toString());

        setCheckIn(checkIn);
        sessionStorage.setItem("checkIn", checkIn.toISOString());

        setCheckOut(checkOut);
        sessionStorage.setItem("checkOut", checkOut.toISOString());

        setChildCount(childCount);
        sessionStorage.setItem("childCount", childCount.toString());

        setHotelName(hotelName);
        sessionStorage.setItem("hotelName", hotelName);

        setHotelCity(hotelCity);
        sessionStorage.setItem("hotelCity", hotelCity);

        setHotelCountry(hotelCountry);
        sessionStorage.setItem("hotelCountry", hotelCountry);

    }

    const removeBookingValues = () => {
        sessionStorage.clear();
    }

    return (
        <BookingContext.Provider value={{
            totalPrice,
            totalNumberOfNights,
            adultsCount,
            checkIn,
            checkOut,
            childCount,
            hotelName,
            hotelCity,
            hotelCountry,
            saveBookingValues,
            removeBookingValues,
        }}>

            {
                children
            }

        </BookingContext.Provider>
    )

}

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  return context as BookingContext;
};