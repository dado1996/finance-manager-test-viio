import Joi from "joi";

const id = Joi.number();
const accountId = Joi.string().length(8).pattern(/^[0-9]+$/);
const bankName = Joi.string().max(32);
const clientEmail = Joi.string().email();
const initialDeposit = Joi.number().min(100);

export const CreateAccountsSchema = Joi.object({
  bankName: bankName.required(),
  clientEmail: clientEmail.required(),
  initialDeposit: initialDeposit.required(),
});

export const EditAccountSchemaParams = Joi.object({
  accountId: accountId.required(),
});

export const EditAccountSchemaBody = Joi.object({
  bankName: bankName.required(),
  clientEmail: clientEmail.required(),
  totalValue: initialDeposit.required(),
});