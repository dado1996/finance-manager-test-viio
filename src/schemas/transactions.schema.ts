import Joi from "joi";

const id = Joi.string().uuid();
const amount = Joi.number();
const accountSenderId = Joi.number()
  .min(10000000)
  .max(99999999)
  .message("Not a valid account id");
const accountReceiverId = Joi.number()
  .disallow(Joi.ref("accountSenderId"))
  .min(10000000)
  .max(99999999)
  .messages({
    'string.disallow': "Accounts can't be the same",
    'string.min': "Not a valid account id",
    'string.max': "Not a valid account id",
  })

export const CreateTransactionSchema = Joi.object({
  amount: amount.required(),
  accountSenderId: accountSenderId.required(),
  accountReceiverId: accountReceiverId.required(),
});

export const EditTransactionSchemaParams = Joi.object({
  uniqueId: id.required(),
});

export const EditTransactionSchemaBody = Joi.object({
  amount: amount,
  accountSenderId: accountSenderId,
  accountReceiverId: accountReceiverId, 
});
