import express from "express";
import "dotenv/config"
import { connectMongoDB } from "./connection.js";
import userRouter from "./routes/user.js";
import cors from "cors"

const app = express()
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: false,
  }))
const PORT =process.env.PORT
connectMongoDB(process.env.MONGO_DB)

app.use(express.json())
app.use('/user',userRouter)

app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})