
export type Auction = {
    created_by : string,
    _id : string,
    title : string,
    description : string,
    starting_price : Number,
    current_price : Number,
    starting_time : Date,
    ending_time : Date,
    highest_bidder : string,
    highest_bidder_username : string
}//change String to string