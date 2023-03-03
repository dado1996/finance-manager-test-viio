import Joi from "joi";

const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string();

export const registerSchema = Joi.object({
  name: name,
  email: email.required(),
  password: password.message('Not a valid password').required(),
  confirmPassword: password.allow(Joi.ref('password')).message('Passwords must match').required(),
});