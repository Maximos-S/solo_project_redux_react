import { set } from 'js-cookie';
import React, {useState, useEffect} from 'react';
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const state = useSelector(state => state)

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])

    if(sessionUser) return (
        <Redirect to="/" />
    )

    const registerUser = e => {
        e.preventDefault()
        setErrors([]);
        return dispatch(sessionActions.login({
            credential, password
        })).catch((res) => {
            if (res.data && res.data.errors) {
                setErrors(res.data.errors);
            }
        })
    }
    return (
        <form onSubmit={registerUser} >
            <ul>
                {errors.map((error, idx) => (
                     <li key={idx}>{error}</li>
                ))}
            </ul>
            <label for="userName">User Name</label>
            <input type="text" id="userName" onChange={e=>setCredential(e.target.value)}  required value={credential} />
            <label for="password">Password</label>
            <input type="password" id="password" onChange={e=>setPassword(e.target.value)} required value={password} />
            <button type="submit">Log In</button>
        </form>
    );
};


export default LoginFormPage;