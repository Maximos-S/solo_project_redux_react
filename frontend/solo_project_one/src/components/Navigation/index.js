import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import ProfileButton from './ProfileButton';


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    return (
        <ul>
            <NavLink to="/">Home</NavLink>
            {sessionUser ? 
            <div>
                <ProfileButton user={sessionUser}/>

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