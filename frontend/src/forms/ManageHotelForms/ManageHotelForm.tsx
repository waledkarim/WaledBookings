import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection"
import TypeSection from "./TypesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImageSection";
import { HotelType } from "../../../../backend/src/types/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
  };

  type Props = {
    hotel?: HotelType,
    onSave: (hotelFormData: FormData) => void,
    isLoading: boolean,
  };
  

const ManageHotelForm = ({ hotel, onSave, isLoading }: Props) => {

    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {

      reset(hotel);

    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();

        if(hotel){
          formData.append("hotelId", hotel._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
    
    
        formDataJson.facilities.forEach((facility, index) => {
          formData.append(`facilities[${index}]`, facility);
        });
    
    
        if (formDataJson.imageUrls){
          formDataJson.imageUrls.forEach((url, index) => {
            formData.append(`imageUrls[${index}]`, url);
          });
        }
    
    
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
          formData.append(`imageFiles`, imageFile);
        });
    
        onSave(formData);

    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col mb-32 md:items-center" onSubmit={onSubmit}>
                <div className="flex flex-col max-w-[900px]">
                    <DetailsSection />
                    <TypeSection />
                    <FacilitiesSection />
                    <GuestsSection />
                    <ImagesSection />
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="btn-blue mt-2"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </FormProvider>
    )

}

export default ManageHotelForm;