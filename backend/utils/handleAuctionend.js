
import { json } from "express";
import { Auction } from "../models/auction.js";
import { User } from "../models/user.js";
export const handleAuctionEnd = async (auctionId) => {
  const auction = await Auction.findById(auctionId);
  if (!auction) return;

  if (auction.highest_bidder) {
      const winner = await User.findById(auction.highest_bidder);
      if (winner) {
          winner.items_owned += 1;
          await winner.save();
      }
  }
};

export const setupAuctionTimeouts = async () => {
    console.log("timer started")
    const now = new Date()
    const auctions = await Auction.find({ ending_time: { $gt: now }, starting_time: { $lte: now} }).exec();
    auctions.forEach(auction => {
        const timeLeft = new Date(auction.ending_time).getTime() - Date.now();
        if (timeLeft > 0) {
            setTimeout(() => handleAuctionEnd(auction._id), timeLeft);
        }
    });
};

export const singleTimeout = async (auctionId) => {

    const auction = await Auction.findById(auctionId);
    const timeLeft = new Date(auction.ending_time).getTime() - Date.now();

    try {
        if(auction)
        {
            if (timeLeft > 0) {
                setTimeout(() => handleAuctionEnd(auction._id), timeLeft);
            };
        }
    } catch (error) {
        console.log(error)
    }
    
}