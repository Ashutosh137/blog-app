import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const VerifyLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!user) return res.status(401).json({ message: "User login failed" });

    (req as any).user = user ;

    next();
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Token error" });
  }
};

export default VerifyLogin;
