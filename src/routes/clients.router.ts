import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../lib/jwt";
import validationHandler from "../middlewares/validation.handler";
import {
  createClientSchema,
  editClientSchemaBody,
  editClientSchemaParams,
} from "../schemas/clients.schema";
import ClientsServices from "../services/clients.services";

const router = Router();
const service = new ClientsServices();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await service.get();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await service.getFirst(parseInt(id));
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
});

router.post(
  "/",
  validationHandler(createClientSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = await service.store(req.body);
      res.status(200).json({
        status: "success",
        message: "Client created successfully",
        token: generateToken({ name, email }),
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validationHandler(editClientSchemaParams, "params"),
  validationHandler(editClientSchemaBody, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await service.edit(parseInt(id), req.body);
      res.status(200).json({
        status: "success",
        message: "Client updated successfully",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validationHandler(editClientSchemaParams, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await service.remove(parseInt(id));
      res.status(200).json({
        status: "success",
        message: "Client deleted successfully",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
