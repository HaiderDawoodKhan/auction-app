import mongoose, { Schema } from "mongoose";
import { Auction } from "./auction.js";
const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    items_owned : {
        type : Number,
        default : 0,
        required : true
    },
    created_auctions : [{
        type : Schema.Types.ObjectId,
        ref : "Auction",
        default : []
    }]
})

export const User = mongoose.model("User",userSchema)