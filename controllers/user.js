import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import OTP from "otp-generator"
import { sendMail } from "../utils/sendmail.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET
    );
    return res.status(200).json({
      message: "User Register Successfully",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }
    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET
    );
    return res.status(200).json({
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function forgetPassword(req,res){
    try{
        const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(200).json({
            message:"User not registered"
        })
    }
    const otp = OTP.generate(6, { upperCase: false, specialChars: false,alphabets:false})
    user.resetPasswordOtp = otp
    user.resetPasswordOtpExpires = Date.now() +15*60*1000
    await user.save()
    
    const message = `Your reset password OTP is ${otp}\nThis OTP is valid for 15 min`
    await sendMail({
        to:user.email,
        subject:`Reset Password OTP`,
        text:message,
    })
    return res.status(200).json({
        message:"OTP Sent"
    })
    }catch(error){
        return res.status(400).json({
            error:error.message
        })
    }
}

export async function otpVerify(req,res) {
    try {
        const {email,otp} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    if(user.resetPasswordOtpExpires < Date.now()){
        return res.status(400).json({
            message:"Otp expire"
        })
    }
    if(user.resetPasswordOtp !== otp){
        return res.status(400).json({
            message:"Incorrect otp"
        })
    }

    user.resetPasswordOtp=undefined
    user.resetPasswordOtpExpires=undefined
    user.otpVerify =true
    await user.save()

    return res.status(200).json({
        message:"Otp Verify"
    })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
}

export async function resetPassword(req,res) {
    try {
        const {email,newPassword}= req.body
    const user = await User.findOne({email})
    if(!user.otpVerify){
        return res.status(400).json({
            message:"verify otp first"
        })
    }
    const hashedpassword = await bcrypt.hash(newPassword,8)
    user.password = hashedpassword
    await user.save()

    return res.status(200).json({
        message:"Password reset successfully"
    })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
}