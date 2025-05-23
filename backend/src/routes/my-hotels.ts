import express, { Request, Response } from "express";
import multer from "multer";
import { verifyToken } from "../middeware/auth";
import { body } from "express-validator";
import { HotelType } from "../types/types";
import cloudinary from 'cloudinary';
import Hotel from "../models/hotel";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/", verifyToken, async (req: Request, res: Response): Promise<Response<HotelType>> => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    if(hotels.length === 0){
      return res.status(500).json({message: "You currenty have no hotels registered"})
    }
    return res.json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request<{id:string}>, res: Response): Promise<Response<HotelType>> => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    return res.json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.post("/",
    verifyToken,
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("type").notEmpty().withMessage("Hotel type is required"),
      body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
      body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response): Promise<Response<HotelType>> => {
      try {
        const imageFiles = (req.files as Express.Multer.File[]);
        const newHotel: HotelType = req.body;
  
        const imageUrls = await uploadImages(imageFiles);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
  
  
        const hotel = new Hotel(newHotel);
        await hotel.save();
        
        return res.status(201).send({ message: "Hotel created successfully" });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
);

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request<{hotelId:string}>, res: Response) => {
    try {
      
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );


      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }


      const files = (req.files as Express.Multer.File[]);
      const updatedImageUrls = await uploadImages(files);


      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];


      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);


async function uploadImages(imageFiles: Express.Multer.File[]) {

  const uploadPromises = imageFiles.map( async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;

}



export default router;