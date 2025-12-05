import { model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

export const ToDo = model("todo", todoSchema);
