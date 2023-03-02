import { NextFunction, Request, response, Response } from "express";
import { ObjectSchema } from "joi";

function validationHandler(schema: ObjectSchema, property: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      res.status(400).json({
        status: 'error',
        message: 'An error has occurred on data validation',
        data: error.details.map((err) => ({
          message: err.message,
        })),
      });
      return;
    }

    next();
  };
}

export default validationHandler;