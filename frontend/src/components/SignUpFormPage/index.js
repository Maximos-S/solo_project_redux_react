import React, {useState, useEffect} from 'react';
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import './SignUpForm.css'

const SignUpFormPage = () => {
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

    const registerUser = e => {
        e.preventDefault()
        if(password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signUp({
                username, email, password
            })).catch((res) => {
                if (res.data && res.data.errors) {
                    setErrors(res.data.errors);
                }
            })
        }
        return setErrors(['Confirm Password and Password must match'])
    }

    return (
        <form onSubmit={registerUser} >
            <ul>
                {errors.map((error, idx) => (
                     <li key={idx}>{error}</li>
                ))}
            </ul>
            <label for="userName">User Name</label>
            <input type="text" id="userName" onChange={e=>setUsername(e.target.value)}  required value={username} />
            <label for="email">Email</label>
            <input type="email" id="email" onChange={e=>setEmail(e.target.value)}  required value={email} />
            <label for="password">Password</label>
            <input type="password" id="password" onChange={e=>setPassword(e.target.value)} required value={password} />
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" onChange={e=>setConfirmPassword(e.target.value)} required value={confirmPassword} />
            <button type="submit">Sign Up</button>
        </form>
    );
};


export default SignUpFormPage;