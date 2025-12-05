import Joi from "joi";

export const createTodoSchema = Joi.object({
  task: Joi.string().trim().min(1).max(200).required().messages({
    "string.base": "Task must be a text",
    "string.empty": "Task cannot be empty",
    "string.min": "Task must have at least 1 character",
    "string.max": "Task cannot exceed 200 characters",
    "any.required": "Task is required",
  }),
})
