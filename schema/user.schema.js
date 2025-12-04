import Joi from "joi"

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
      "any.required": "Name is required",
    }),
  
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  
    password: Joi.string().min(2).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 2 characters",
      "any.required": "Password is required",
    }),
  
    age: Joi.number().integer().required().messages({
      "number.base": "Age must be a number",
      "any.required": "Age is required",
    }),
  
    role: Joi.string().valid("USER", "ADMIN").required().messages({
      "any.only": "Role must be USER or ADMIN",
      "any.required": "Role is required",
    }),
  });

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  
    password: Joi.string().min(2).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 2 characters",
      "any.required": "Password is required",
    }),
  });

export const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  });

export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
      }),
      newPassword: Joi.string().min(2).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 2 characters",
        "any.required": "Password is required",
      })
    })
