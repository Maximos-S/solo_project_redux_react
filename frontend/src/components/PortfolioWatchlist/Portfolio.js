import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as searchActions from '../../store/search';
import PortfolioStock from './PortfolioStock';
import './portfolio.css'


const Portfolio = () => {
    const sessionUser = useSelector(state => state.session.user)
    const portfolio = useSelector(state => state.portfolio)
    const stocks = useSelector(state => state.portfolio.stocks)

    const dispatch = useDispatch()
    let history = useHistory();
    const rerouteProfile = (e) => {
        reset();
        history.push("/")
    }
    const reset = e => {
        dispatch(searchActions.setNewsResult())
        return(dispatch(searchActions.setSearchResult()))
    }

    useEffect(() => {
        getPortfolio()
    }, []);

    const getPortfolio = () => {
        dispatch(portfolioActions.getPortfolio(
            sessionUser.id
            )).catch((res) => {
                //to do
            })
    }


    let value;
    let buyingPower
    if (portfolio.portfolio.buyingPower){
        buyingPower = Number(portfolio.portfolio.buyingPower).toFixed(2);
        value = portfolio.portfolio.Stocks.reduce( (total, stock) => {
            return total += stock.StocksInList.shares * stock.latestPrice
        },0)
        value = value.toFixed(2)
    }

    return (
        <div className="portfolio">
            <div className="portfolioHeader">
            <div className="portfolioTitle" onClick={rerouteProfile}>Portfolio</div>
            {portfolio && <div className="value">${buyingPower}</div>}
            <div className="valueTitle">credit:</div>
            <div className="money">${value}</div>
            </div>
            <div className="portfolioStocks">
                {portfolio.portfolio.Stocks && portfolio.portfolio.Stocks.map(
                    (stock, idx) => (<PortfolioStock key={stock.id} stock={portfolio.portfolio.Stocks[idx]}
                    stocksList={portfolio.portfolio.Stocks.StocksInList}/>)
                )}
            </div>
        </div>
    );
};


export default Portfolio;

