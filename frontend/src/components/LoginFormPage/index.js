import { set } from 'js-cookie';
import React, {useState, useEffect} from 'react';
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import './LoginForm.css'
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

const LoginFormPage = ({loginRevealed, setLoginRevealed, setSignupRevealed}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const state = useSelector(state => state)


    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])

    if(sessionUser) {
    return (
        <Redirect to="/" />
    )
    }
        
    const handleLoginButton = e => {
        e.preventDefault();
        e.stopPropagation();
        if (loginRevealed) {
            registerUser(e)
        } else {
            const loginPartition = document.getElementById("loginPartition")
            const signupPartition = document.getElementById("signupPartition")
            const loginButton = document.getElementById("loginButton")
            const signupButton = document.getElementById("signupButton")
            loginPartition.style.height = "0vh"
            signupPartition.style.height= "100vh"
            setLoginRevealed(true)
            setSignupRevealed(false)
        }
        
    }

    const loginDemo = e => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({
            "credential": "Demo-lition", "password": "password"
        })).catch((res) => {
            if (res.data && res.data.errors) {
                const trigger = document.getElementById("popover-trigger-2")
                trigger.click();
                setErrors(res.data.errors);
            }
        })
    }
    const registerUser = e => {
        e.preventDefault()
        setErrors([]);
        return dispatch(sessionActions.login({
            credential, password
        })).catch((res) => {
            if (res.data && res.data.errors) {
                const trigger = document.getElementById("popover-trigger-2")
                trigger.click();
                setErrors(res.data.errors);
            }
        })
    }

    return (
        <div className="loginBox">

            <form className="login" onSubmit={registerUser} >
                <div className="loginErrorContainer">
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
                <label htmlFor="userName">User Name</label>
                <input className="formFieldLogin" type="text" id="userName" onChange={e=>setCredential(e.target.value)}  required value={credential} />
                <label htmlFor="password">Password</label>
                <input className="formFieldLogin" type="password" id="password" onChange={e=>setPassword(e.target.value)} required value={password} />
                <button onClick={handleLoginButton}id="loginButton" className="specialButton" type="submit">Log In</button>
            </form>
            <div>
                <button onClick={loginDemo}id="loginButton" className="specialButton" type="submit">Demo User</button>
            </div>
        </div>
    );
};


export default LoginFormPage;