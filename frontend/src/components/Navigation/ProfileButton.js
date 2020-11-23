import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session'

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false)

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => {
        setShowMenu(false);
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
        <div onMouseLeave={closeMenu}>
            <button onMouseEnter={openMenu} >
                <i className="fas fa-jedi" onClick={openMenu}></i>
            </button>
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