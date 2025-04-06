import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/types/types";
import { AiFillStar } from "react-icons/ai";


const SearchResultsCard = ({ hotel }: {hotel: HotelType}) => {

  return (

    <div className="w-full border border-slate-300 rounded-lg p-3 lg:flex lg:gap-x-4">

      {/* Image section */}
      <div className="w-full h-[300px] lg:flex-1">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Details section */}
      <div className="flex flex-col gap-y-2 lg:justify-between lg:flex-[2]">

        {/* Hotel name and star rating section */}
        <div className=" py-2">
            <div className="flex items-center">
              <span className="flex">
                {
                  Array.from({ length: hotel.starRating }).map((_, ind) => (
                      <AiFillStar key={ind} className="fill-yellow-400" />
                    ))
                }
              </span>
              <p className="ml-1 text-sm">{hotel.type}</p>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
        </div>

        {/* Desc section */}
        <div className="h-[150px] overflow-auto mb-4">
          <div className="break-words">{hotel.description}</div>
        </div>

        {/* Facilities, price and btn section */}
        <div className="flex flex-col gap-y-3">

          <div className="flex gap-1 overflow-x-auto">
            {
              hotel.facilities.map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs">
                  {facility}
                </span>
              ))
            }

          </div>

          <div className="flex flex-col gap-1">
            <p className="font-bold self-end">BDT {hotel.pricePerNight} per night</p>
            <button className="w-full btn-blue lg:w-auto lg:self-end">
                <Link
                  to={`/detail/${hotel._id}`}
                  className="">
                  View More
                </Link>
            </button>
          </div>

        </div>

      </div>

    </div>

  );

};

export default SearchResultsCard;