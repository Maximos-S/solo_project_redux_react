import React from 'react';
import {useSelector} from 'react-redux'
import {Bar} from 'react-chartjs-2'
import './news.css'
import './profile.css'


const Profile = () => {
    let portfolio = useSelector(state => state.portfolio)
    portfolio = portfolio.portfolio

    let totalCost = 0;
    let value;
    let buyingPower
    let netGain;
    let chart = {"datasets": [{"data": [],"label": "Your Equity",
                    "borderWidth": 2,
                    "borderColor": "rgb(0, 200, 5)"},
                    {"data": [],"label": "Your Cost",
                    "borderWidth": 2,
                    "borderColor": "rgb(255, 80, 0)"}, 
                    {"data": [],"label": "Total Return",
                    "borderWidth": 2,
                    "borderColor": "#00eaFF"}, 
                    ], 
                    "labels": []}
    let chart2 = {"datasets": [{"data": [], "label": "Shares", "borderColor": "#00eaFF", "borderWidth": 2}], "labels": []}
    if (portfolio.buyingPower){
        buyingPower = Number(portfolio.buyingPower).toFixed(2);
        value = portfolio.Stocks.reduce( (total, stock) => {
            return total += stock.StocksInList.shares * stock.latestPrice
        },0)
        value = value.toFixed(2)
        if (portfolio.StocksInLists) {
            totalCost = portfolio.StocksInLists.reduce((cost, stocks) => {
                return Number(cost += Number(stocks.cost))
            },0)
            totalCost = totalCost.toFixed(2)
            
        }
        if (value - totalCost < 0) {
            netGain = "redGain"
        }else {
    
            netGain = "greenGain"
        }
        if (portfolio.Stocks) {
            let stockTuples = {}
            portfolio.Stocks.forEach((stock, idx) => {
                stockTuples[stock.id] = [`${stock.symbol}: $${stock.latestPrice}`,stock.latestPrice]
            })
            portfolio.StocksInLists.forEach(stock => {
                const equity = stock.shares * stockTuples[stock.stockId][1]
                stockTuples[stock.stockId].push(equity)
                chart.datasets[1].data.push(stock.cost)
                chart.datasets[2].data.push((equity - stock.cost).toFixed(2))
                chart2.datasets[0].data.push(stock.shares)
            })
            for (const item in stockTuples) {
                chart.labels.push(stockTuples[item][0])
                chart2.labels.push(stockTuples[item][0])
                chart.datasets[0].data.push(stockTuples[item][2])
            }

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
                <div className="stockCharts">
                    <Bar data={chart}/>
                    <Bar data={chart2}/>
                </div>
            </div>
    );
};


export default Profile;