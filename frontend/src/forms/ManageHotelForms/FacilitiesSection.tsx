import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../constants/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
        {/* Header Section */}
        <h2 className="form-heading">Facilities</h2>
        {/* Checklist section */}
        <div className="flex flex-col gap-y-1 lg:grid lg:grid-cols-5 lg:gap-3">
            {
              hotelFacilities.map((facility, ind) => (
                <label key={ind} className="flex gap-1 text-gray-700">
                    <input
                      type="checkbox"
                      value={facility}
                      {...register("facilities", {
                          validate: (facilities) => {
                          if (facilities && facilities.length > 0) {
                              return true;
                          } else {
                              return "At least one facility is required";
                          }
                          },
                      })}
                    />
                    {facility}
                </label>
                ))
            }
        </div>
      {
        errors.facilities && (
            <span className="text-red-500 text-sm font-bold">
              {errors.facilities.message}
            </span>
          )
      }
    </div>
  );
};

export default FacilitiesSection;