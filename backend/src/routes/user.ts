import { Router, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, ValidationError, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middeware/auth";

const router = Router();

interface RegisterRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});


router.post("/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ], 
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response> => {

  const errors: ValidationError[] = validationResult(req).array();

  if (errors.length) {
    return res.status(400).json({ message: errors });
  }

  try {

    let { email, password } = req.body;

    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    req.body = {
      ...req.body,
      password
    }
        
    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      .status(200).send({message: "User registered successfully"});

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      message: "Something went wrong in /register route in routes/user.ts",
    });
    
  }
  
});


export default router;
