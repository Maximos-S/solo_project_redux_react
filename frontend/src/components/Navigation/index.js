import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './navbar.css'
import * as searchActions from '../../store/search';
import ProfileButton from './ProfileButton';


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const portfolioId = useSelector(state => state.portfolio.portfolio.id)
    const [searchTerm, setSearchTerm] = useState("")

    let history = useHistory()
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false)
        const closeMenu = () => {
        setShowMenu(false);
    }

    const rerouteProfile = (e) => {
        reset();
        history.push("/")
    }


    const searchStock = e => {
        e.preventDefault();

        return dispatch(searchActions.search({
            searchTerm,
            portfolioId
        })).catch((res) => {
            //to do
        })
    }
    const changeTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const reset = e => {
        dispatch(searchActions.setNewsResult())
        return(dispatch(searchActions.setSearchResult()))
    }

    return (
        <div className="navbar">
            <div className="logo" onClick={rerouteProfile}/>
            <form onSubmit={searchStock}>
                <input className="searchbar" type="search" value={searchTerm}  placeholder="search by stock symbol"  onChange={changeTerm}/>
            </form>
            <div className="user-login" onMouseLeave={closeMenu}>
                
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