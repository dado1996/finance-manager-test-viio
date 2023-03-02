import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data: any) => {
  return jwt.sign({ ...data }, process.env.JWT_KEY!, {
    expiresIn: "24h",
  });
};
