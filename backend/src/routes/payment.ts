import express, {Request, Response} from "express";
import { ObjectId } from "mongodb";
import SSLCommerzPayment from 'sslcommerz-lts';
import { verifyToken } from "../middeware/auth";
import Hotel from "../models/hotel";

const router = express.Router();
const store_id = "wedwe6800b678e9d36";
const store_password = "wedwe6800b678e9d36@ssl";
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:7000" : "http://waledbookings.onrender.com";


type RequestBody = {
    firstName: string;
    lastName: string;
    email: string;
    hotelId: string,
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    totalCost: number;
}

router.post("/", verifyToken,
    async (req: Request<{}, {}, RequestBody>, res: Response) => {

        const tran_id = new ObjectId();
        const {firstName, lastName, email, totalCost, adultCount, checkIn, checkOut, childCount, hotelId} = req.body;

        try {

            const data = {

                store_id: "wedwe6800b678e9d36",
                store_passwd: "wedwe6800b678e9d36@ssl",
                currency: 'BDT',
                shipping_method: 'No',
                product_name: 'Hotel Booking',
                product_category: 'Booking/Reservation',
                product_profile: 'general',
                cus_add1: 'Dhaka',
                cus_city: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01902706272',

                tran_id: `${tran_id}`,
                success_url: `${BASE_URL}/api/payments/success?firstName=${firstName}&lastName=${lastName}&email=${email}&adultCount=${adultCount}&childCount=${childCount}&checkIn=${checkIn}&checkOut=${checkOut}&userId=${req.userId}&totalCost=${totalCost}&hotelId=${hotelId}`,
                fail_url: `${BASE_URL}/api/payments/fail`,
                cancel_url: `${BASE_URL}/api/payments/cancel`,
                total_amount: totalCost,
                cus_name: firstName + lastName,
                cus_email: email,

            };
    
            const sslcz = new SSLCommerzPayment(store_id, store_password);
            const resp = await sslcz.init(data);
    
            // console.log(resp.GatewayPageURL);
            res.status(200).json(resp.GatewayPageURL);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }


    }
);

type RequestQueryType = {
    firstName: string,
    lastName: string,
    email: string,
    hotelId: string
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date,
    userId: string,
    totalCost: number
}

router.post("/success",
    async (req: Request<{},{},{},RequestQueryType>, res:Response) => {

    try {

        const hotel = await Hotel.findOneAndUpdate(
            { _id: req.query.hotelId },
            {
                $push: { bookings: {...req.query} },
            }
            );

            if (!hotel) {
            return res.status(400).json({ message: "Hotel Not Found" });
            }

            await hotel.save();
            res.redirect(`${BASE_URL}/payment-success`);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

)

router.post("/fail",
     (req: Request, res: Response) => {
        res.redirect(`${BASE_URL}/payment-failed`);
     }
)

router.post("/cancel",
     (req: Request, res: Response) => {
        res.redirect(`${BASE_URL}/payment-cancelled`);
     }
)





export default router;