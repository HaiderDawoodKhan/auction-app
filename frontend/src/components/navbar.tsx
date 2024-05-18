import NavbarCSS from '../components/modules/navbar.module.css'
import userAsset from '../assets/user.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export const Navbar = () => {
    
    const dispatch = useDispatch();

    function handleLogout() 
    {
        dispatch(logout());
    }

    return(
        <div>
        <ul className={NavbarCSS.container}>
            <span className={NavbarCSS.sub_container}>
                <li ><Link to='/home' className={NavbarCSS.pageLink} >Home</Link></li>
                <li ><Link to='/browse' className={NavbarCSS.pageLink}>Browse</Link></li>
            </span>
            <span className={NavbarCSS.sub_container}> 
                <li><Link to='/profile'><img src={userAsset} width="40px" /></Link></li>
                <li className={NavbarCSS.logout} onClick={handleLogout}>Logout</li>
            </span>
        </ul>
    </div>
    )
}