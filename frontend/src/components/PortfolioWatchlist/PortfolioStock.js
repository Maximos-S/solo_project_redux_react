import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as searchActions from '../../store/search';


const PortfolioStock = ({stock}) => {

    const dispatch = useDispatch()


    //need to hook up stock to redux to update the stocks in portfolio section
    // const portfolio = useSelector(state => state.portfolio)

    useEffect(() => {

    }, []);

    const searchStock = (e) => {        
        const searchTerm = stock.symbol
        return dispatch(searchActions.search({
            searchTerm
        })).catch((res) => {
            //to do
        })
    }

    console.log("stock", stock)
    const updatedAt = stock.lastUpdated.slice(0,10)

    return (
        <div className="stock" onClick={searchStock}>
            <div className="symbol" >{stock.symbol}</div>
            {stock.StocksInList && 
             stock.StocksInList.shares &&
             <div className="shares">{stock.StocksInList.shares} Shares</div>}
            <div className="price">${stock.latestPrice}</div>
            <div className="updated">{updatedAt}</div>
        </div>
    );
};


export default PortfolioStock;