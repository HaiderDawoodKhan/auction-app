import SignupCSS from '../pages/modules/Signup.module.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function handleSubmit(e : any)
    {
        e.preventDefault();
        if(!username || !password || !repassword)
        {
            window.alert("Please fill in the fields!")
            setUsername("")
            setPassword("")
            setRepassword("")
            return;
        }
        
        if(repassword != password)
        {
            window.alert("Passwords not match! Try again")
            setUsername("")
            setPassword("")
            setRepassword("")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/user/create",{username,password})
            
            dispatch(dispatch(loginSuccess({ 
                _id : res.data.user._id,
                username : res.data.user.username, 
                password : res.data.user.password,
                items_owned : res.data.user.items_owned,
                created_auctions : res.data.user.created_auctions,
            })));
            navigate('/home')
            
        } catch (error) {
            window.alert("Username is already taken...")
            setUsername("")
            setPassword("")
            setRepassword("")
            console.log(error)
        }
    }
    return(
        <div className={SignupCSS.signupContainer}>
                <form className={SignupCSS.login_form}>
                    <h2>Signup</h2>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="username">Username</label>
                        <input type="text" value = {username} id="username" name="username" placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="password">Password</label>
                        <input type="password" value = {password} id="password" name="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input type="password" value = {repassword} id="confirmpassword" name="password" placeholder="Re-enter your password" onChange={e => setRepassword(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <button type="submit" onClick={handleSubmit}>Sign Up</button>
                    </div>
                    <div className={`${SignupCSS.form_group} ${SignupCSS.signup_link}`}>
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
    )
    
}