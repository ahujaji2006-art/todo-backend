import JWT from "jsonwebtoken"

export const auth = (req,res,next)=>{
    try {
        const authHeaders = req.headers.authorization
    if(!authHeaders){
        return res.status(400).json({
            message:"Auth Header is  missing"
        })
    }
    const parts = authHeaders.split(" ")
    if(parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(400).json({
            message : "Wrong Format of auth"
        })
    }
    const token = parts[1]
    if(!token){
        return res.status(400).json({
            message:"Token is missing"
        })
    }
    const decoded = JWT.verify(token,process.env.SECRET)

    req.user = decoded
    next()
    } catch (error) {
        return res.status(400).json({
            message:"token is incorrect",
            error:error.message
        })
    }
}