import { NextFunction, Request, Response, Router } from "express";
import validationHandler from "../middlewares/validation.handler";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import ClientsServices from "../services/clients.services";

const router = Router();
const service = new ClientsServices();

router.post(
  "/",
  validationHandler(registerSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const token = await service.store({ name, email, password, confirmPassword });
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
