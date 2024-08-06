require("dotenv").config();

import jwt, { JwtPayload } from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "";

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
  };
  
  export const verifyToken = (token: string): JwtPayload | null => {
    try {
      return jwt.verify(token, SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  };