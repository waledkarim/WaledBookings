import {Response, Request, NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies["auth_token"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret) as CustomJwtPayload;
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
};