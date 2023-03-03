import { NextFunction, Request, Response, Router } from "express";
import validationHandler from "../middlewares/validation.handler";
import {
  CreateTransactionSchema,
  EditTransactionSchemaBody,
  EditTransactionSchemaParams,
} from "../schemas/transactions.schema";
import TransactionsServices from "../services/transactions.services";

const router = Router();
const service = new TransactionsServices();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.get();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await service.getFirst(id);
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
  validationHandler(CreateTransactionSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, accountSenderId, accountReceiverId } = req.body;
      const result = await service.store({ amount, accountSenderId, accountReceiverId });
      res.status(200).json({
        status: "success",
        message: "Transaction created successfully",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.put(
  "/:uniqueId",
  validationHandler(EditTransactionSchemaParams, "params"),
  validationHandler(EditTransactionSchemaBody, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uniqueId } = req.params;
      const { amount, accountSenderId, accountReceiverId } = req.body;
      const result = await service.edit(uniqueId, {
        amount,
        accountSenderId,
        accountReceiverId,
      });
      res
        .status(200)
        .json({
          status: "success",
          message: "Transaction edited successfully",
          data: result,
        });
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete("/:uniqueId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uniqueId } = req.params;
    const result = await service.remove(uniqueId);
    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
