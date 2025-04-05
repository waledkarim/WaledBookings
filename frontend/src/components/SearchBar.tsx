import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  console.log("destination: "+destination, "checkIn: " +checkIn, "checkOut: " +checkOut, "adultCount: " +adultCount, "childCount: " +childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-50 -mt-4 p-3 bg-orange-400 rounded shadow-md flex flex-col gap-y-2 lg:flex-row lg:justify-between lg:gap-x-3"
    >
      {/* Where are you going input field */}
      <div className="flex items-center flex-1 bg-white p-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* Adults and children input field */}
      <div className="flex bg-white px-2 py-1 rounded">
        <label className="items-center flex">
          Adults:
          <input
            className="p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      {/* Check-in input field */}
      <div className="">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          isClearable
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>

      {/* Check-out input field */}
      <div className="">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          isClearable
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded"
          wrapperClassName="min-w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-x-1">
        <button className="btn-blue w-2/3 lg:w-auto">
          Search
        </button>
        <button className="w-1/3 lg:w-auto bg-red-600 text-white rounded-lg p-2 font-semibold hover:bg-red-500">
          Clear
        </button>
      </div>

    </form>
  );
};

export default SearchBar;