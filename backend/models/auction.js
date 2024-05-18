import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    created_by: {
        type : String,
        required : true
    },
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    starting_price: {
        type : Number,
        required : true
    },
    current_price : {
        type : Number,
        default : function() {
            return this.starting_price
        }
    },
    starting_time: {
        type : Date,
        default : new Date(),
        required : true
    },
    ending_time: {
        type : Date,
        required : true
    },
    highest_bidder: {
        type: String,
        default : ""
    },
    highest_bidder_username: {
        type : String,
        default : ""
    }
})
auctionSchema.index({ ending_time: 1 });

export const Auction = mongoose.model("Auction",auctionSchema)