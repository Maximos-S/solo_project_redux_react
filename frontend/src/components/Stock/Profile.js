import React from 'react';
import {useSelector} from 'react-redux'
import {Line} from 'react-chartjs-2'
import './news.css'


const Profile = () => {
    let portfolio = useSelector(state => state.portfolio)
    portfolio = portfolio.portfolio

    let totalCost = 0;
    let value;
    let buyingPower
    let netGain;
    if (portfolio.buyingPower){
        buyingPower = Number(portfolio.buyingPower).toFixed(2);
        value = portfolio.Stocks.reduce( (total, stock) => {
            return total += stock.StocksInList.shares * stock.latestPrice
        },0)
        value = value.toFixed(2)
        if (portfolio.StocksInLists) {
            totalCost = portfolio.StocksInLists.reduce((cost, stocks) => {
                return Number(cost += stocks.cost)
            },0)
        }
        if (value - totalCost < 0) {
            netGain = "redGain"
        }else {
    
            netGain = "greenGain"
        }
    }

    return (
            <div className="stockBox">
                <div className="stockInfo">
                    <div className="stockText">
                        <h2 className="stockName">Portfolio</h2>
                        <h1 className="stockPrice">${value}</h1>
                        <div >
                            <h3 className="stockSymbol">cost: ${totalCost}</h3>
                            <h3 className="stockSymbol" id={netGain}>net gain: ${totalCost?(value - totalCost).toFixed(2): 0}</h3>
                        </div>
                        <h3 className="stockSymbol">credit: ${buyingPower}</h3>
                    </div>
                </div>
            </div>
    );
};


export default Profile;