import { RootState } from '../store/store';
import { useSelector,useDispatch } from 'react-redux';
import ProfileCSS from '../pages/modules/Profile.module.css'
import { Link } from 'react-router-dom';
import userAsset from '../assets/user.png'
import { Navbar } from '../components/navbar'
import { useEffect, useState } from 'react';
import { SingleAuction } from '../components/auction';
import axios from 'axios';

export const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch()
    const [items, setItems] = useState(user?.items_owned)
    useEffect(() => {

        const originalDisplay = document.body.style.display;

        document.body.style.display = 'inline';
    
        return () => {
            document.body.style.display = originalDisplay;
        };
      }, []);
    
    async function getUserItems (id : string | undefined)
    {
        const res = await axios.get(`http://localhost:8000/user/info/${id}`)
        console.log(res.data.user.items_owned)
        setItems(res.data.user.items_owned)
    }
    
    useEffect(() => {
        getUserItems(user?._id)
    },[])
    return (
        <>
            <Navbar/>
            <div className={ProfileCSS.container}>
            <div className={ProfileCSS.profile_info}>
                <div className={ProfileCSS.profile_image}>
                    <img src={userAsset} alt="User"/>
                </div>
                <div className={ProfileCSS.user_details}>
                    <h2>Username: {user?.username}</h2>
                </div>
            </div>
            <div>
                    <h3>Number of items owned: {Number(items)}</h3>
            </div>
            <div className={ProfileCSS.profile_actions}>
                <Link to='/auction/create'><button >Create Auction</button></Link>
                <Link to='/change/password'><button >Change Password</button></Link>
            </div>
            <h3>My Auctions</h3>
            <div className={ProfileCSS.auction_list}>
                {user?.created_auctions.map(auction => <SingleAuction key={auction} auction={auction}/>)}
            </div>
            
            </div>        
        </>
    )
}