import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as searchActions from '../../store/search';
import * as watchlistActions from '../../store/watchlist';


const PortfolioStock = ({stock, stocksList, watchlist}) => {

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()


    //need to hook up stock to redux to update the stocks in portfolio section
    // const portfolio = useSelector(state => state.portfolio)

    useEffect(() => {

    }, []);

    const searchStock = (e) => {   
        if (e.target.className === "remove") return 
        const searchTerm = stock.symbol
        return dispatch(searchActions.search({
            searchTerm
        })).catch((res) => {
            //to do
        })
    }

    
    const removeWatchlist = (e) => {
        console.log("stock",stock)
        return dispatch(watchlistActions.remove(stock.id, sessionUser.id))
    }

    const updatedAt = stock.lastUpdated.slice(0,10)
    console.log(stock)
    return (
        <div className="stock" onClick={searchStock}>
            <div className="symbol" >{stock.symbol}</div>
            {stock.StocksInList && 
             stock.StocksInList.shares &&
             <div className="shares">{stock.StocksInList.shares} Shares</div>}
            {watchlist &&
             <div className="remove" onClick={removeWatchlist}>remove</div>}
            <div className="price">${stock.latestPrice}</div>
            <div className="updated">{updatedAt}</div>
        </div>
    );
};


export default PortfolioStock;