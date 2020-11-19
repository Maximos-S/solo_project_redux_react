import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session'
import ProfileButton from './ProfileButton';


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout());
    }
    
    return (
        <ul>
            <NavLink to="/">Home</NavLink>
            {sessionUser ? 
            <div>
                <NavLink to="/" onClick={logout}>Log Out</NavLink> 
                <ProfileButton />
            </div> 
            :
            <div>
                <NavLink to="/signup">Sign up</NavLink>
                <NavLink to="/login">Log in</NavLink>
            </div>
            }
        </ul>
    );
};


export default Navigation;