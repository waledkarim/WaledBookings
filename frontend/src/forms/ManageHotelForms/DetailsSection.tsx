import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">

      {/* Heading Section */}
      <h1 className="form-heading">Hotel Details</h1>

      {/* Name input field */}
      <label className="input-label">
        Name
        <input
          type="text"
          className="input"
          {...register("name", { required: "This field is required" })}
        ></input>
        {
          errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )
        }
      </label>

      {/* Country and City input fields */}
      <div className="flex flex-col max-w-[800px] md:flex-row gap-5">
            <label className="input-label flex-1">
              Country
              <input
                className="input"
                {...register("country", { required: "This field is required" })}
              />
            {
              errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )
            }
            </label>
            <label className="input-label flex-1">
              City
              <input
                className="input"
                {...register("city", { required: "This field is required" })}
              />
            {
              errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )
            }
            </label>
      </div>

      {/* Desc input field */}
      <label className="input-label">
        Description
        <textarea
          rows={10}
          className="input"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {
          errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )
        }
      </label>
      
      {/* Price per night input field */}
      <label className="input-label">
        Price Per Night
        <input
          type="number"
          min={1}
          className="input"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {
          errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )
        }
      </label>
      
      {/* Star rating input field */}
      <label className="input-label">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="input"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {
            [1, 2, 3, 4, 5].map((num, ind) => (
              <option key={ind} value={num}>{num}</option>
            ))
          }
        </select>
        {
          errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )
        }
      </label>

    </div>
  );
};

export default DetailsSection;