import express from "express";
import { createUser,loginUser, changePassword,addAuction, getAllAuctions, getUserInfo } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.post('/create',createUser)
userRouter.post('/login',loginUser)
userRouter.post('/changepassword',changePassword)
userRouter.post('/add/auction',addAuction)
userRouter.get('/:id',getAllAuctions)
userRouter.get('/info/:id',getUserInfo)