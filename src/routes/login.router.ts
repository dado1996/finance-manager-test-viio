import { NextFunction, Request, Response, Router } from "express";
import validationHandler from "../middlewares/validation.handler";
import { loginSchema } from "../schemas/login.schema";
import ClientsServices from "../services/clients.services";

const router = Router();
const service = new ClientsServices();

router.post(
  "/",
  validationHandler(loginSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await service.login(email, password);
      res.status(200).json({
        status: "success",
        token: token,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
