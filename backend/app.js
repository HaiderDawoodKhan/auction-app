import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { userRouter } from "./routes/user.js";
import { auctionRouter } from "./routes/auction.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({mssg : "Welcome"})
})
app.use('/user',userRouter)
app.use('/auction',auctionRouter)