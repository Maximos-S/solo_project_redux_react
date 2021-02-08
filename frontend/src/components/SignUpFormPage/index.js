import React, {useState, useEffect} from 'react';
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import './SignUpForm.css'
import { set } from 'js-cookie';
import {
Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"

const SignUpFormPage = ({signupRevealed, setSignupRevealed, setLoginRevealed}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    // const state = useSelector(state => state)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])

    if(sessionUser) return (
        <Redirect to="/" />
    )

    const handleSignupClick = (e) => {
        e.preventDefault()
        e.stopPropagation();

        if(signupRevealed) {
            registerUser(e)
        } else {
            const loginPartition = document.getElementById("loginPartition")
            const signupPartition = document.getElementById("signupPartition")
            const loginButton = document.getElementById("loginButton")
            const signupButton = document.getElementById("signupButton")
            loginPartition.style.height = "100vh"
            signupPartition.style.height= "0vh"
            setSignupRevealed(true)
            setLoginRevealed(false)
        }

    }

    const registerUser = e => {
        e.preventDefault()
        if(password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signUp({
                username, email, password
            })).catch((res) => {
                if (res.data && res.data.errors) {
                    const trigger = document.getElementById("popover-trigger-4")
                    trigger.click();
                    setErrors(res.data.errors);
                }
            })
        }
        return setErrors(['Confirm Password and Password must match'])
    }

    return (
        <div className="signup">
            <form className="signup" onSubmit={registerUser} >
                <div className="signupErrorContainer">
                    <Popover>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                {errors.map((error, idx) => (
                                        <div key={idx}>{error}</div>
                                ))}
                            </PopoverBody>
                        </PopoverContent>
                            <PopoverTrigger>
                                <div></div>
                            </PopoverTrigger>
                    </Popover>
                </div>
                <label htmlFor="userName" className="signupLabel">User Name</label>
                <input className="formField" type="text" id="userName" onChange={e=>setUsername(e.target.value)}  required value={username} />
                <label htmlFor="email" className="signupLabel">Email</label>
                <input className="formField" type="email" id="email" onChange={e=>setEmail(e.target.value)}  required value={email} />
                <label htmlFor="password" className="signupLabel">Password</label>
                <input className="formField" type="password" id="password" onChange={e=>setPassword(e.target.value)} required value={password} />
                <label htmlFor="confirmPassword" className="signupLabel">Confirm Password</label>
                <input className="formField" type="password" id="confirmPassword" onChange={e=>setConfirmPassword(e.target.value)} required value={confirmPassword} />
                <button onClick={handleSignupClick} id="signupButton" className="specialButton" type="submit">Sign Up</button>
            </form>
        </div>
    );
};


export default SignUpFormPage;