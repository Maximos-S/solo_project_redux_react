import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './navbar.css'
import * as sessionActions from '../../store/search';

import ProfileButton from './ProfileButton';


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)


    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false)
        const closeMenu = () => {
        setShowMenu(false);
    }

    const [searchTerm, setSearchTerm] = useState("")

    const searchStock = e => {
        console.log("search bar")
        e.preventDefault();

        return dispatch(sessionActions.search({
            searchTerm
        })).catch((res) => {
            //to do
        })
    }
    const changeTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="navbar">
            <div className="logo">
                <div>Logo</div>
            </div>
            <form onSubmit={searchStock}>
                <input className="searchbar" type="search" value={searchTerm}  placeholder="search by stock symbol"  onChange={changeTerm}/>
            </form>
            <div className="user-login" onMouseLeave={closeMenu}>
                <NavLink className="specialButton"to="/">Home</NavLink>
                {sessionUser ? 
                <div>
                    <ProfileButton user={sessionUser} showMenu={showMenu} setShowMenu={setShowMenu}/>

                </div> 
                :
                <div>
                    <NavLink className="specialButton" to="/signup">Sign up</NavLink>
                    <NavLink className="specialButton" to="/login">Log in</NavLink>
                </div>
                }
            </div>
        </div>
    );
};


export default Navigation;