import AuctionCSS from '../components/modules/auction.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Auction } from './types/Auction.types';

const initialState : Auction = {
    created_by : "",
    _id : "",
    title : "",
    description : "",
    starting_price : 0,
    current_price : 0,
    starting_time : new Date(),
    ending_time : new Date(),
    highest_bidder : "",
    highest_bidder_username : ""
}
export const SingleAuction = (props:any) => {
    const [auction, setAuction] = useState<Auction>(initialState)
    async function fetchAuction(id:string)
    {
        try {
            if(id)
            {
                const res = await axios.get(`http://localhost:8000/auction/${id}`)
                console.log(res.data)
                setAuction(res.data.auction)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        fetchAuction(props.auction)
    }, [])
    
    const status = (endingDate : Date, startingDate : Date) =>
    {
        if(new Date() < startingDate) {return "Closed"}
        if(new Date() < endingDate) {return "Ongoing" } 
        else { return "Ended" }
    }

    const formatDate = (date : Date) => 
    {
        return new Date(date).toLocaleString('en-US', {
            weekday: 'long',
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true})
    }
    return (
            <div className={AuctionCSS.auction_card}>
                <h4>{auction.title}</h4>
                <p>{auction.description}</p>
                <p>Starting Price: Rs. {Number(auction.starting_price)}</p>
                <p>Current Price: Rs. {Number(auction.current_price)}</p>
                <p>Start Time: {formatDate(auction.starting_time)}</p>
                <p>End Time: {formatDate(auction.ending_time)}</p>
                <p>Status: {status(new Date(auction.ending_time),new Date(auction.starting_time))}</p>
            </div>
    )
}