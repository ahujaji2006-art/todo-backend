import {model,Schema} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String
    },
    resetPasswordOtp:{
        type:String
    },
    resetPasswordOtpExpires:{
        type:Date
    },
    otpVerify:{
        type:Boolean
    },
},{timestamps:true})

export const User = model("user",userSchema)