import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navbar'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ChangePassCSS from '../pages/modules/ChangePass.module.css'
import { changePassword } from '../store/authSlice';


export const ChangePassword = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentpassword, setCurrentpassword] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [newrepassword, setNewRepassword] = useState("")


    async function handleSubmit(e : any)
    {
        e.preventDefault();
        if(currentpassword !== user?.password)
        {
            window.alert("Current password is incorrect! Try again")
            setCurrentpassword("")
            setNewpassword("")
            setNewRepassword("")
            return;
        }
        if(newpassword !== newrepassword)
        {
            window.alert("Passwords not match! Try again")
            setCurrentpassword("")
            setNewpassword("")
            setNewRepassword("")
            return;
        }
        if(newpassword === currentpassword)
        {
            window.alert("Enter a different password! Try again")
            setCurrentpassword("")
            setNewpassword("")
            setNewRepassword("")
            return;
        }
        try {
            await axios.post("http://localhost:8000/user/changepassword",{id : user?._id , password : newpassword})
            dispatch(changePassword(newpassword))
            window.alert("Password Changed Successfully")
            navigate('/profile')
            
        } catch (error) {
            window.alert(error)
            setCurrentpassword("")
            setNewpassword("")
            setNewRepassword("")
            console.log(error)
        }
    }

    return (
        <div className={ChangePassCSS.container}>
            <Navbar/>
            <form className={ChangePassCSS.login_form}>
                <h2>Change Password</h2>
                <div className={ChangePassCSS.changepass_form}>
                    <label htmlFor="oldpassword">Current Password</label>
                    <input type="password" value = {currentpassword} id="oldpassword" name="oldpassword" placeholder="Enter your old password" onChange={e => setCurrentpassword(e.target.value)}/>
                </div>
                <div className={ChangePassCSS.form_group}>
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" value={newpassword} id="newpassword" name="password" placeholder="Enter your new password" onChange={e => setNewpassword(e.target.value)}/>
                </div>
                <div className={ChangePassCSS.form_group}>
                        <label htmlFor="confirmnewpassword">Confirm New Password</label>
                        <input type="password" value = {newrepassword} id="confirmnewpassword" name="password" placeholder="Re-enter your new password" onChange={e => setNewRepassword(e.target.value)}/>
                    </div>
                <div>
                    <button type="submit" className = {ChangePassCSS.changepassButton} onClick={handleSubmit}>Change Password</button>
                </div>
            </form>
        </div>
    )
}