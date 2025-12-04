import { required } from "joi"
import {model,Schema} from "mongoose"

const todoSchema = new Schema ({
    task:{
        type:String,
        required:true
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})