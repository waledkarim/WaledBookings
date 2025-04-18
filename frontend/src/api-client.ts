import { ServerMessageType } from "./contexts/AppContext";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, UserType } from "../../backend/src/types/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData): Promise<{ message: string}> => {

  console.log("Inside register mutation Fn");
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;

};

export const validateToken = async (): Promise<ServerMessageType> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
  
};

export const signIn = async (formData: SignInFormData): Promise<{ userId: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async (): Promise<{message: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    return response.json();
  } catch (error) {
    throw new Error("Logout operation failed!");
  }

};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {

  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", String(searchParams.page));


  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");


  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );


  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));


  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );


  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }


  return response.json();

};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {

  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
  
};


export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("There was an error fetching hotels");
  }
  return response.json();
};

// type SSLCommerzSessionResponse = {
//   status: string,
//   failedreason: string,
//   sessionkey: string,
//   gw: string,
//   GatewayPageURL: string,
//   storeBanner: string,
//   storeLogo: string,
//   desc: Array<string>,
// }

type BookingDataType = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
}

export const getPaymentURL = async (bookingData: BookingDataType): Promise<string> => {

  const response = await fetch(`${API_BASE_URL}/api/payments`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData),
    }
  );

  if(!response.ok){
    throw new Error("Could not create a SSLCommerz session");
  }

  return response.json();

}

