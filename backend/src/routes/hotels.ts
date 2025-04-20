import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../types/types";
import { param, validationResult } from "express-validator";
import { verifyToken } from "../middeware/auth";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated").limit(5);
    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/search", async (req: Request, res: Response) => {

    try {
      
      const query = constructSearchQuery(req.query);
  
      let sortOptions = {};
      
      switch (req.query.sortOption) {
        case "starRating":
          sortOptions = { starRating: -1 };
          break;
        case "pricePerNightAsc":
          sortOptions = { pricePerNight: 1 };
          break;
        case "pricePerNightDesc":
          sortOptions = { pricePerNight: -1 };
          break;
      }
  
      const pageSize = 5;
      const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : "1"
      );
      
      const skip = (pageNumber - 1) * pageSize;
  
      const hotels = await Hotel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);
  
      const total = await Hotel.countDocuments(query);
  
      const response: HotelSearchResponse = {
        data: hotels,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      };
  
      res.json(response);
      
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/:hotelId",
  [
    param("hotelId").notEmpty().withMessage("Hotel ID is required"),
  ],
  async (req: Request<{hotelId: string}>, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.hotelId.toString();

    try {

      const hotel = await Hotel.findById(id);
      res.json(hotel);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

router.get("/:hotelId/unavailable-dates",
  async (req: Request, res: Response) => {

  const { hotelId } = req.params;

  try{

    const hotel = await Hotel.findById(hotelId).select('bookings.checkIn bookings.checkOut');

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    const unavailableDates = hotel.bookings.map((booking: {checkIn: Date, checkOut: Date}) => ({
      start: booking.checkIn,
      end: booking.checkOut,
    }));

    res.status(200).json(unavailableDates);

  }catch(error){
    console.log(error);
    res.status(500).json({message: error});
  }



  }
);



const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
  
    return constructedQuery;
};



export default router;