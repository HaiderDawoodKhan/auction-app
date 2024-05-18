import { Navbar } from "../components/navbar"
import AuctionAsset from '../assets/auction.png'
import SpecificAuctionCSS from '../pages/modules/SpecificAuction.module.css'
import { useEffect,useState } from "react"
import { Auction } from "../components/types/Auction.types"
import { useParams } from "react-router-dom"
import axios from "axios"
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';


const initialState : Auction = {
    created_by : "",
    _id : "",
    title : "",
    description : "",
    starting_price : 0,
    current_price : 0,
    starting_time : new Date(),
    ending_time : new Date(),
    highest_bidder: "",
    highest_bidder_username: ""
}
export const SpecificAuction = () =>
{
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.auth.user);
    const [error, setError] = useState(false)
    const [bidPlaced, setbidPlaced] = useState(false)
    const [anotherBid, setAnotherBid] = useState(false)
    const [auction, setAuction] = useState<Auction>(initialState)
    const [bid, setBid] = useState(0)
    const [currentPrice, setcurrentPrice] = useState<Number>(0)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [highestBidder, setHighestBidder] = useState<string>("")
    const [timeremains, settimeremains] = useState(true)
    
    useEffect(() => {

        const originalDisplay = document.body.style.display;

        document.body.style.display = 'inline';
    
        return () => {
            document.body.style.display = originalDisplay;
        };
    }, []);

    
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/auction/${id}`);
                setAuction(res.data.auction);
                setcurrentPrice(res.data.auction.current_price)
                setHighestBidder(res.data.auction.highest_bidder_username)

            } catch (error) {
                console.error('Failed to fetch auction:', error);
            }
        };

        fetchAuction();
    }, [id]); 
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        newSocket.emit("join-room", id);
        newSocket.emit("timer",id)

        newSocket.on("update", (newPrice,bidderUsername) => {
            setAuction(prev => ({ ...prev, current_price: newPrice }));
            setcurrentPrice(newPrice)
            setHighestBidder(bidderUsername)
            setAnotherBid(true)
            setTimeout(()=>{setAnotherBid(false)},3000)
        });
        newSocket.on("timer-end",(data)=>{
            settimeremains(false)
        })
        return () => {
            newSocket.emit("leave_room", id);
            newSocket.off();
        };
        
    }, [id]);
    // useEffect(() => {
    //     const newSocket = io("http://localhost:8000");
    //     setSocket(newSocket);
    //     newSocket.emit("join-room", id);
    //     newSocket.emit("timer",id)
    //     socket?.on("update", (newPrice,bidderUsername) => {
    //         setAuction(prev => ({ ...prev, current_price: newPrice }));
    //         setcurrentPrice(newPrice)
    //         setHighestBidder(bidderUsername)
    //         setAnotherBid(true)
    //         setTimeout(()=>{setAnotherBid(false)},3000)
    //     });
    //     return () => {
    //         newSocket?.emit("leave_room", id);
    //         newSocket?.off();
    //     };
        
    // }, [socket]);

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = new Date(auction.ending_time).getTime() - Date.now();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24)); 
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / 1000 / 60) % 60); 
                const seconds = Math.floor((difference / 1000) % 60); 
    
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Auction ended');
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer); 
    }, [timeLeft]);
    
    // socket?.on("update", (newPrice,bidderUsername) => {
    //     setAuction(prev => ({ ...prev, current_price: newPrice }));
    //     setcurrentPrice(newPrice)
    //     setHighestBidder(bidderUsername)
    //     setAnotherBid(true)
    //     setTimeout(()=>{setAnotherBid(false)},3000)
    // });
    // socket?.on("timer-end",(data)=>{
    //     settimeremains(false)
    //     socket.off()
    // })
    async function handleClick(e:any)
    {
        e.preventDefault()
        const endTime = new Date(auction.ending_time);
        if(new Date() > endTime)
        {
            window.alert("Auction has ended")
            settimeremains(false)
            return;
        }
        if(!bid || bid <= (auction.current_price || 0))
        {
            setError(true)
            setBid(0)
            setTimeout(() => {setError(false)}, 2000);
            return;
        }
        try {
            setError(false)
            auction.current_price = bid
            setcurrentPrice(bid)
            const bidder_username = user ? user.username : ""
            setHighestBidder(bidder_username)
            socket?.emit("place_bid", { auctionId: id, newPrice: bid, bidderId : user?._id, bidderUsername : user?.username });
            setbidPlaced(true)
            setBid(0)
            setTimeout(() => {setbidPlaced(false)}, 2000);
             
        } catch (error) {
            console.log(error)
        }
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
    return(
        <div>
            <Navbar/>
            <div className={SpecificAuctionCSS.auction_details}>
            <div className={SpecificAuctionCSS.auction_image}>
                <img src={AuctionAsset} alt="Item Image"/>
            </div>
                <div className={SpecificAuctionCSS.auction_info}>
                    <h2 className={SpecificAuctionCSS.auction_title}>{auction.title}</h2>
                    <p className={SpecificAuctionCSS.description}>{auction.description}</p>
                    <p><strong>Starting Price:</strong> Rs. {Number(auction.starting_price)}</p>
                    <p><strong>Current Price:</strong> Rs. {Number(currentPrice)} {highestBidder ? `set by ${highestBidder}` : ""}</p>
                    <p><strong>Start Time:</strong> {formatDate(auction.starting_time)}</p>
                    <p><strong>End Time:</strong> {formatDate(auction.ending_time)}</p>
                    {(user?.username != auction.created_by) && timeremains && <div className={SpecificAuctionCSS.bid_form}>
                        <label htmlFor="bidAmount">Your Bid:</label>
                        <input type="number" value={bid} id="bidAmount" name="bidAmount" min="0" step="1" required onChange={e => setBid(e.target.valueAsNumber)}/>
                        <button type="submit" onClick={handleClick}>Place Bid</button>
                        {error && <h3 className={SpecificAuctionCSS.errorMsg}>You need to bid higher than the current price!</h3>}
                        {bidPlaced && <h3 className={SpecificAuctionCSS.bidPlaced}>Bid Placed Successfully!</h3>}
                        {anotherBid && <h3 className={SpecificAuctionCSS.higherbidPlaced}>Someone placed a higher bid!</h3>}
                    </div>}
                    <h3>Time Left: {timeLeft}</h3>
                </div>
                <br/>
                
            </div>
        </div>
    )
}