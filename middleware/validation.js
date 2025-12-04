export const validataRegister = (schema)=>{
    return (req,res,next) => {
        const data ={...req.body,...req.query}
        const {error} = schema.validate(data)

        if(error){
            return res.status(400).json({
                error:error.deatil[0].message
            })
        }
        next()
    }
}