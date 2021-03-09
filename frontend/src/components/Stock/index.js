import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as watchlistActions from '../../store/watchlist';
import {Line} from 'react-chartjs-2'
import './news.css'

function Stock() {
    const stock = useSelector(state => state.search.stock)
    const chart = useSelector(state => state.search.chart)
    const watchlist = useSelector(state => state.watchlist)

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const [stockDetail, setStockDetail] = useState()
    const [shares, setShares] = useState(0)
    const [sell, setSellShares] = useState(0)

    useEffect(() => {
        setStockDetail(stock, shares)
        console.log("stocksszz", stockDetail)
    },[stock])

    const setShareNumber = (e) => {
        setShares(e.target.value)
    } 
    const setSellNumber = (e) => {
        setSellShares(e.target.value)
    } 
    const addPortfolio = e => {
        if (shares === 0) return
        dispatch(portfolioActions.addToPortfolio(
            stock, shares, sessionUser.id
            ))
        setShares(0);
        if (stockDetail.StocksInLists) {
            stockDetail.StocksInLists[0].shares += 1
        } else {
            stockDetail.StocksInLists = [{"shares": 1}]
        }
    }
    const addWatchlist = e => {

        return dispatch(watchlistActions.addToWatchlist(
            stock, sessionUser.id
        ))
    }
    const sellPortfolio = e => {
        if (stockDetail.StocksInLists[0].shares == 0) {
            alert("You can't sell what you don't have")
            setSellShares(0)
            return
        }
        if (sell === 0) return
        dispatch(portfolioActions.sellPortfolio(
            stock, sell, sessionUser.id
        ))
        setSellShares(0)
        stockDetail.StocksInLists[0].shares -= 1
    }


    // let data = {
    //     label: [],
    //     datasets: [{label: data: borderColor: },{}]
    // }

    return (
        <div className="stockBox">
            <div className="stockInfo">
                <div className="stockText">
                    {stockDetail && <h2 className="stockName">
                        {stockDetail.companyName}
                        <p className="stockSymbol">({stockDetail.symbol})</p>
                    </h2>}
                    {stockDetail && <h1 className="stockPrice">${stockDetail.latestPrice}</h1>}
                    {stockDetail && <h4 className="stockChange" id={stockDetail.percentChange < 0?"redGain":"greenGain"}>
                        {stockDetail.percentChange}%
                        </h4>}  
                    <div className="watchButton" onClick={addWatchlist}>watch</div>
                </div>
                <div className="stockButtons">
                    {stockDetail && stockDetail.StocksInLists && <div class="stockShares">shares owned: {stockDetail.StocksInLists[0].shares}</div>}  

                    <input className="buyInput" type="number" min="0"  onChange={setShareNumber} value={shares}/>
                    <div className="buyButton" onClick={addPortfolio}>buy shares</div>
                    <input className="sellInput" type="number" min="0" onChange={setSellNumber} value={sell}/>
                    <div className="sellButton" onClick={sellPortfolio}>sell shares</div>

                </div>
            </div>
            <div className="stockChart">
                <Line data={chart}/>
            </div>
        </div>
    )
}

export default Stock;