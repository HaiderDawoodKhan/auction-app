import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import {connect} from './utils/db.js'
import { Auction } from "./models/auction.js";
import { User } from "./models/user.js";
import {setupAuctionTimeouts}  from "./utils/handleAuctionend.js";


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

connect()
setupAuctionTimeouts()

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  
  socket.on('join-room', (auctionId) => {
    socket.join(auctionId);
    console.log(`Socket ${socket.id} joined auction room ${auctionId}`);
  });

  socket.on('place_bid', async ({ auctionId, newPrice, bidderId, bidderUsername }) => {
      try {
          const auction = await Auction.findByIdAndUpdate(auctionId,{ current_price : newPrice, highest_bidder : bidderId, highest_bidder_username : bidderUsername});
          socket.broadcast.to(auctionId).emit('update', newPrice, bidderUsername);
          console.log(`Bid updated to ${newPrice} on auction ${auctionId}`);
      } catch (error) {
          console.error('Error updating bid:', error);
          socket.to(auctionId).emit('error', 'Failed to place bid');
      }
  });

  socket.on('timer',async (data)=>{
    const auction = await Auction.findById(data);
    if(!auction) return;
    const timeLeft = new Date(auction.ending_time).getTime() - Date.now();

    if(timeLeft > 0)
    {
      setTimeout(()=>{
        io.to(data).emit("timer-end","check")
      },timeLeft)
    }
  })
  socket.on('end_auction',async (data) =>{
    try {
      console.log("Timeout request received")
      const  auctionId  = data;
      const auction = await Auction.findById(auctionId);
      if (!auction) {
          socket.emit('error', 'Auction not found');
          return;
      }
      singleTimeout(data);  
      
  } catch (error) {
      console.error('Error ending auction:', error);
      socket.emit('error', 'Error ending the auction');
  }
  })
  socket.on('leave_room', (auctionId) => {
      socket.leave(auctionId);
      console.log(`Socket ${socket.id} left auction room ${auctionId}`);
  });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
  
});
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const singleTimeout = async (auctionId) => {

  const auction = await Auction.findById(auctionId);
  const timeLeft = new Date(auction.ending_time).getTime() - Date.now();
  if(auction)
  {
    if (timeLeft > 0) {
        setTimeout(() => {handleAuctionEnd(auction._id)}, timeLeft);
      };
  }
  
}

const handleAuctionEnd = async (auctionId) => {
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