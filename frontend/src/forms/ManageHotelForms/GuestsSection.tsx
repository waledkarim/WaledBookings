import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>

      {/* Heading Section */}
      <h2 className="form-heading">Guests</h2>

      {/* Adult and children input fieldds */}
      <div className="flex flex-col p-6 gap-5 bg-gray-300 lg:grid lg:grid-cols-2">

        {/* Adults input field */}
        <label className="input-label">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {
            errors.adultCount?.message && (
              <span className="text-red-500 text-sm fold-bold">
                {errors.adultCount?.message}
              </span>
            )
          }
        </label>
        {/* Children input field */}
        <label className="input-label">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {
            errors.childCount?.message && (
              <span className="text-red-500 text-sm fold-bold">
                {errors.childCount?.message}
              </span>
            )
          }
        </label>

      </div>
      
    </div>
  );
};

export default GuestsSection;