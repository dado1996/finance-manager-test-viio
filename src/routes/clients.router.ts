import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../lib/jwt";
import validationHandler from "../middlewares/validation.handler";
import { createClientSchema } from "../schemas/clients.schema";
import ClientsServices from "../services/clients.services";

const router = Router();
const service = new ClientsServices();

router.get("/", (req: Request, res: Response) => {
  try {
    const result = service.get();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
  }
});

router.get("/:id", (req: Request, res: Response) => {});

router.post(
  "/",
  validationHandler(createClientSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = await service.store(req.body);
      res.status(200).json({
        status: 'success',
        message: 'Client created successfully',
        token: generateToken({ name, email }),
      })
    } catch (error: any) {
      next(error);
    }
  }
);

router.put("/:id", (req: Request, res: Response) => {});

router.delete("/:id", (req: Request, res: Response) => {});

export default router;
