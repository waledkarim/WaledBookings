import React, { useContext, useState } from "react"

type BookingContext = {
    totalPrice: number | null,
    adultsCount: number | null,
    checkIn: Date | null,
    checkOut: Date | null,
    childCount: number | null
    totalNumberOfNights: number | null,
    hotelName: string | null,
    hotelCity: string | null,
    hotelCountry: string | null,
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

    const checkIn = sessionStorage.getItem("checkIn") ? new Date(sessionStorage.getItem("checkIn") as string) : null;
    const totalPrice = Number(sessionStorage.getItem("totalPrice"));
    const totalNumberOfNights = Number(sessionStorage.getItem("totalNumberOfNights"));
    const adultsCount = Number(sessionStorage.getItem("adultsCount"));
    const checkOut = sessionStorage.getItem("checkOut") ? new Date(sessionStorage.getItem("checkOut") as string) : null;
    const childCount = Number(sessionStorage.getItem("childCount"));
    const hotelName = sessionStorage.getItem("hotelName");
    const hotelCity = sessionStorage.getItem("hotelCity");
    const hotelCountry = sessionStorage.getItem("hotelCountry");

    const saveBookingValues = (totalPrice: number, totalNumberOfNights: number, adultsCount: number, checkIn: Date, checkOut: Date, childCount: number, hotelName: string, hotelCity: string, hotelCountry: string) => {

        sessionStorage.setItem("totalPrice", totalPrice.toString());
        sessionStorage.setItem("totalNumberOfNights", totalNumberOfNights.toString());
        sessionStorage.setItem("adultsCount", adultsCount.toString());
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("childCount", childCount.toString());
        sessionStorage.setItem("hotelName", hotelName);
        sessionStorage.setItem("hotelCity", hotelCity);
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