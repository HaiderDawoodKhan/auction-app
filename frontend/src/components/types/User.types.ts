import {Auction} from './Auction.types'
export type User = {
    _id : string,
    username : string,
    password : string,
    items_owned : Number,
    created_auctions : string[]
}