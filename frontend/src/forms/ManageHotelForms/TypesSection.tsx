import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../constants/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      {/* Heading section */}
      <h2 className="form-heading">Type</h2>

      <div className="flex flex-col gap-y-3 lg:grid lg:grid-cols-5 lg:gap-2">
        {
          hotelTypes.map((type) => (
            <label
              className={
                typeWatch === type
                  ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                  : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
              }
            >
              <input
                type="radio"
                value={type}
                {...register("type", {
                  required: "This field is required",
                })}
                className="hidden"
              />
              <span>{type}</span>
            </label>
          ))
        }
      </div>
      {
        errors.type && (
          <span className="text-red-500 text-sm font-bold">
            {errors.type.message}
          </span>
        )
      }
    </div>
  );
};

export default TypeSection;