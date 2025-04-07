import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";



const Detail = () => {
  const { hotelId } = useParams();

  const [currentPicInd, setCurrentPicInd] = useState<number>(0);

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  function handleRightClick(){

    if(currentPicInd === (hotel?.imageUrls?.length as number) - 1){
      setCurrentPicInd(0);
    }

    setCurrentPicInd((prev) => prev + 1);

  }

  function handleLeftClick(){

    if(currentPicInd === 0){
      if(hotel?.imageUrls){
        setCurrentPicInd(hotel.imageUrls.length);
      }else{
        return;
      }
    }

    setCurrentPicInd((prev) => prev - 1);

  }


  return (
    <>
      {
        isLoading ? "Please wait while we fetch the Hotel..." :
        hotel ? 
        <div className="space-y-6 py-5">

          {/* Star rating and heading */}
          <div className="">
            <span className="flex">
              {
                Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" />
                ))
              }
            </span>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
          </div>

          {/* Image section in small screens */}
          <div className="flex justify-center">
            <div className="flex relative w-fit h-[300px] lg:hidden">
                <FaArrowAltCircleLeft onClick={handleLeftClick} size={30} className="absolute left-0 top-1/2 text-white"/>
                  {
                    hotel.imageUrls.map((image, ind) => (
                      <div className="h-[300px]">
                        <img
                          key={ind}
                          src={image}
                          alt={hotel.name}
                          className={`rounded-md w-full h-full object-cover object-center ${currentPicInd === ind ? "" : "hidden"}`}
                        />
                      </div>
                    ))
                  }
                <FaArrowAltCircleRight onClick={handleRightClick} size={30} className="absolute right-0 top-1/2 text-white"/>
                <span className="flex justify-center gap-x-2 absolute bottom-5 inset-x-0">
                {
                  hotel.imageUrls.map((_, ind) => (
                    <button
                      onClick={() => setCurrentPicInd(ind)}
                      key={ind}
                      className={`size-2 rounded-full cursor-pointer ${currentPicInd === ind ? "bg-white" : "bg-gray-600"}`}
                    />
                    ))
                }
                </span>
            </div>
          </div>

          {/* Image section in large screens */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
            {
              hotel.imageUrls.map((image) => (
                <div className="h-[300px]">
                  <img
                    src={image}
                    alt={hotel.name}
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                </div>
              ))
            }
          </div>

          {/* Facilities section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {
              hotel.facilities.map((facility) => (
                <div className="border border-slate-500 rounded-sm p-3">
                  {facility}
                </div>
              ))
            }
          </div>

          {/* Desc and Form section */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

            <div className="whitespace-pre-line text-pretty text-justify tracking-wide h-[250px] overflow-y-auto lg:h-auto lg:overscroll-y-none">   
              
              {hotel.description}

            </div>
            <div className="h-fit">
              <GuestInfoForm
                pricePerNight={hotel.pricePerNight}
                hotelId={hotel._id}
              />
            </div>

          </div>

        </div> :
        "Sorry no hotels to show..."
      }
    </>

  );
};

export default Detail;