import express from "express";
import { validataRegister } from "../middleware/validation.js";
import { forgetPassword, loginUser, otpVerify, registerUser, resetPassword } from "../controllers/user.js";
import { forgetPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../schema/user.schema.js";
const userRouter = express.Router()

userRouter.post('/registerUser',validataRegister(registerSchema),registerUser)
userRouter.get('/loginUser',validataRegister(loginSchema),loginUser)
userRouter.get('/forgetPassword',validataRegister(forgetPasswordSchema),forgetPassword)
userRouter.get('/otpVerify',otpVerify)
userRouter.get('/resetPassword',validataRegister(resetPasswordSchema),resetPassword)

export default userRouter