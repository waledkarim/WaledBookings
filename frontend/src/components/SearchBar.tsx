import { ChangeEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  
  const navigate = useNavigate();
  const search = useSearchContext();
  const location = useLocation();

  const [destination, setDestination] = useState<string>(search.destination);

  // const handleSubmit = (event: FormEvent) => {

  //   event.preventDefault();
  //   search.saveSearchValues(
  //     destination,
  //   );
  //   navigate("/search");

  // };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {

    event.preventDefault();
    setDestination(event.target.value);
    search.saveSearchValues(event.target.value);
    if(location.pathname !== "/search"){
      navigate("/search");
    }

  }

  return (
    <form
      // onSubmit={handleSubmit}
      className="relative p-3 bg-orange-400 rounded shadow-md flex flex-col gap-y-2 lg:flex-row lg:justify-between lg:gap-x-3"
    >
      {/* Where are you going input field */}
      <div className="flex items-center flex-1 bg-white p-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={handleSearchChange}
        />
      </div>

      {/* Adults and children input field */}
      {/* <div className="flex bg-white px-2 py-1 rounded">
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
      </div> */}

      {/* Check-in input field */}
      {/* <div className="">
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
      </div> */}

      {/* Check-out input field */}
      {/* <div className="">
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
      </div> */}

      {/* Button */}
      {/* <div className="flex gap-x-1">
        <button type="submit" className="btn-blue w-full lg:w-auto">
          Search
        </button>
      </div> */}

    </form>
  );
};

export default SearchBar;