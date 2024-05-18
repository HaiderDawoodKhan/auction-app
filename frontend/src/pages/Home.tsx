import HomeCSS from '../pages/modules/Home.module.css'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { useEffect } from 'react'
export const Home = () => {
   
    useEffect(() => {

        const originalDisplay = document.body.style.display;
        const originalBox = document.body.style.boxSizing
        
        document.body.style.display = 'block';
        document.body.style.boxSizing = 'border-box'
    
        return () => {
            document.body.style.display = originalDisplay;
            document.body.style.boxSizing = originalBox;
        };
      }, []);
      
    const navigate = useNavigate()
    function takeToProfile() 
    {
        navigate('/profile')
    }
    return(
        <div className={HomeCSS.container}>
            <div>
                <Navbar/>
                <h1>Welcome to BidMe</h1>
                <p className={HomeCSS.subtitle}>Discover unique items and bid to win!</p>
                <button className={HomeCSS.join} onClick={takeToProfile}>Join Now!</button>
            </div>
        </div>
    )
   
}