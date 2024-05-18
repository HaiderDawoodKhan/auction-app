import AuctionCSS from './modules/CreateAuction.module.css'
import { Navbar } from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { RootState } from '../store/store';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAuction } from '../store/authSlice';
import { io, Socket } from 'socket.io-client';


export const CreateAuction = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {

        const originalDisplay = document.body.style.display;

        document.body.style.display = 'block';
    
        return () => {
            document.body.style.display = originalDisplay;
        };
      }, []);
    const user = useSelector((state: RootState) => state.auth.user);
    
    useEffect(() => {
            const newSocket = io("http://localhost:8000");
            setSocket(newSocket);
            return () => {
                socket?.off();
            }
            
    },[])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startingPrice, setStartingPrice] = useState(0)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    
    async function handleSubmit(e : any)
    {
        e.preventDefault();
        const starting_time = new Date(startTime)
        const ending_time = new Date(endTime)
        if(!title || !description || !startingPrice || !endTime || !startTime || startingPrice === 0)
        {
            window.alert("Please fill in all the fields!")
            return;
        }
        if(ending_time <= starting_time)
        {
            window.alert("Enter a valid time!")
            return;
        }
        try {
            const auction_res = await axios.post("http://localhost:8000/auction/create",{
                created_by : user?.username,
                title : title,
                description : description,
                starting_price : startingPrice,
                current_price : startingPrice,
                starting_time : starting_time,
                ending_time : ending_time
            })
            const auc_id = auction_res.data.auction._id
            const user_res = await axios.post("http://localhost:8000/user/add/auction",{
                user_id : user?._id,
                auction_id : auc_id
            })
            socket?.emit("end_auction",auc_id);
            dispatch(addAuction(auc_id))
            navigate('/profile')
        } catch (error) {
            window.alert(error)
        }
    }
    return (
        <div>
            <Navbar/>
            <div className={AuctionCSS.containerAuction}>
            <h1 className={AuctionCSS.h1Auction}>Create Auction</h1>
            <form className={AuctionCSS.formAuction} onSubmit = {handleSubmit}>
                <label className={AuctionCSS.formAuction} htmlFor="title">Title:</label>
                <input type="text" value={title} id="title" name="title" onChange={e => setTitle(e.target.value)} required />
                <label className={AuctionCSS.formAuction} htmlFor="description">Description:</label>
                <textarea id="description" value={description} name="description" rows={4} required={true} onChange={e => setDescription(e.target.value)}></textarea>
                <label className={AuctionCSS.formAuction} htmlFor="startingPrice">Starting Price:</label>
                <input type="number" id="startingPrice" value={startingPrice} name="startingPrice" min="0" step="1" onChange={e => setStartingPrice(e.target.valueAsNumber)} required={true} />
                <label className={AuctionCSS.formAuction} htmlFor="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" value={startTime} name="startTime"  onChange={e => setStartTime(e.target.value)} required={true}/>
                <label className={AuctionCSS.formAuction} htmlFor="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" value={endTime} name="endTime" required={true} onChange={e => setEndTime(e.target.value)} />
                <button className={AuctionCSS.buttonAuction}  type="submit">Create Auction</button>
            </form>
            </div>
        </div>
        
    )
}