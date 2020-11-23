import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session'

const ProfileButton = ({user, showMenu, setShowMenu}) => {
    const dispatch = useDispatch();

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    }
    // useEffect(() => {
    //     if (!showMenu) return;
    //     document.addEventListener('click', closeMenu);
    //     return () => (
    //         document.removeEventListener('click', closeMenu)
    //     )
    // },[showMenu]);

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout());
    }

    
    return (
        <div className="profile">
                <i class="fas fa-user-circle" onMouseEnter={openMenu} ></i>
            {showMenu && (
                <ul  className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li><button onClick={logout}>Log Out</button></li>
                </ul>
            )}
        </div>
    );
};


export default ProfileButton;