import { NextFunction, Request, Response } from "express";
import { validateToken } from "../lib/jwt";


function authToken(req: Request, res: Response, next: NextFunction) {
  try {
    const [_, token] = req.header('Authorization')?.split(' ') as string[];
    const result = validateToken(token);
    next();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'It is required a valid auth token',
    });
  }
}

export default authToken;