import express from 'express'
import { createAuction,getAllAuctions,getAuction,updateAuctionPrice } from '../controllers/auction.js';
export const auctionRouter = express.Router();

auctionRouter.post('/create',createAuction)
auctionRouter.get('/:id',getAuction)
auctionRouter.post('/getAll',getAllAuctions)
auctionRouter.post('/updatePrice',updateAuctionPrice)