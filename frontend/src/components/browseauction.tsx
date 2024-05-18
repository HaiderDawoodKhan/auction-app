import BrowseAuctionCSS from '../components/modules/browseauction.module.css'
import AuctionAsset from '../assets/auction.png'
import { Auction } from './types/Auction.types'
import { Link } from 'react-router-dom'

export const BrowseAuction = (props:any) => {
    const created_Auction : Auction = props.auction
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
        <div className={BrowseAuctionCSS.auction_card}>
            <img src={AuctionAsset} alt="Item Image" className={BrowseAuctionCSS.item_image}/>
            <div className={BrowseAuctionCSS.auction_details}>
                <Link className={BrowseAuctionCSS.auctionLink} to={`/auction/${created_Auction._id}`}><h2 className={BrowseAuctionCSS.auction_title}>{created_Auction.title}</h2></Link>
                <h4>Created by: {created_Auction.created_by}</h4>
                <p className={BrowseAuctionCSS.description}>{created_Auction.description}</p>
                <p>Starting Price: Rs. {Number(created_Auction.starting_price)}</p>
                <p>Start Time: {formatDate(created_Auction.starting_time)}</p>
                <p>End Time: {formatDate(created_Auction.ending_time)}</p>
            </div>
        </div>
    )
}