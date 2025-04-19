import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./utils/db";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings"
import paymentRoutes from "./routes/payment"
import cookieParser from "cookie-parser";
import path from "path";


const PORT = 7000;
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log("[server] server running on port " +PORT);
});