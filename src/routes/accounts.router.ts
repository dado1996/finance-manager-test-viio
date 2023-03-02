import { NextFunction, Request, Response, Router } from "express";
import validationHandler from "../middlewares/validation.handler";
import {
  CreateAccountsSchema,
  EditAccountSchemaBody,
  EditAccountSchemaParams,
} from "../schemas/accounts.schema";
import AccountsService from "../services/accounts.services";

const router = Router();
const service = new AccountsService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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

router.get("/:accountId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountId } = req.params;
    const result = await service.getFirst(parseInt(accountId));
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
  validationHandler(CreateAccountsSchema, "body"),
  async (req: Request, res: Response) => {
    try {
      const { clientEmail, initialDeposit, bankName } = req.body;
      const result = await service.store({
        clientEmail,
        totalValue: initialDeposit as number,
        bankName,
      });
      res.status(200).json({
        status: "success",
        message: "Account created successfully",
        data: result,
      });
    } catch (error: any) {}
  }
);

router.put(
  "/:accountId",
  validationHandler(EditAccountSchemaParams, "params"),
  validationHandler(EditAccountSchemaBody, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accountId } = req.params;
      const { totalValue, clientEmail, bankName } = req.body;
      const result = await service.edit(parseInt(accountId), {
        bankName,
        totalValue,
        clientEmail,
      });
      res.status(200).json({
        status: "success",
        message: "Account edited successfully",
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete("/:accountId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountId } = req.params;
    const result = await service.remove(parseInt(accountId));
    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
