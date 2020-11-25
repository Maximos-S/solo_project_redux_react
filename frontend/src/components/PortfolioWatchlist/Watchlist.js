import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as watchlistActions from '../../store/watchlist';
import PortfolioStock from './PortfolioStock';

import './portfolio.css'

const Watchlist = () => {
    const sessionUser = useSelector(state => state.session.user)
    const watchlist = useSelector(state => state.watchlist)

    const dispatch = useDispatch()
    

    useEffect(() => {
        getWatchlist()
    }, []);


    const getWatchlist = () => {
        dispatch(watchlistActions.getWatchlist(
            sessionUser.id
            )).catch((res) => {
                //to do
            })
    }

    return (
        <div className="watchlist">
            <div className="portfolioHeader">
            <div className="portfolioTitle">Watchlist</div>
            </div>
            <div className="portfolioStocks">
                {watchlist.watchlist.Stocks && watchlist.watchlist.Stocks.map(
                    (stock, idx) => (<PortfolioStock key={stock.id} stock={watchlist.watchlist.Stocks[idx]}/>)
                )}
            </div>
        </div>
    );
};


export default Watchlist;