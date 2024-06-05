import { Joi } from "express-validation";

export const registerValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
    userType: Joi.number().max(1).min(0),
  });