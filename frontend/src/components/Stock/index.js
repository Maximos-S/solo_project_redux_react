import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as watchlistActions from '../../store/watchlist';
import {Line} from 'react-chartjs-2'

function Stock() {
    const stock = useSelector(state => state.search.stock)
    const chart = useSelector(state => state.search.chart)

    console.log("chart data", chart)
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const [stockDetail, setStockDetail] = useState()
    const [shares, setShares] = useState(0)
    const [sell, setSellShares] = useState(0)

    useEffect(() => {
        setStockDetail(stock, shares)
    },[stock])

    const setShareNumber = (e) => {
        setShares(e.target.value)
    } 
    const setSellNumber = (e) => {
        setSellShares(e.target.value)
    } 
    const addPortfolio = e => {
        if (shares === 0) return
        return dispatch(portfolioActions.addToPortfolio(
            stock, shares, sessionUser.id
        ))
    }
    const addWatchlist = e => {

        return dispatch(watchlistActions.addToWatchlist(
            stock, sessionUser.id
        ))
    }
    const sellPortfolio = e => {
        if (sell === 0) return
        return dispatch(portfolioActions.sellPortfolio(
            stock, sell, sessionUser.id
        ))
    }

    // let data = {
    //     label: [],
    //     datasets: [{label: data: borderColor: },{}]
    // }

    return (
        <div className="stockBox">
            <div className="stockInfo">
                <div className="stockText">
                    {stockDetail && <h2 id="stockName">
                        {stockDetail.companyName}
                        <p id="stockSymbol">({stockDetail.symbol})</p>
                    </h2>}
                    {stockDetail && <h1 id="stockPrice">${stockDetail.latestPrice}</h1>}
                    {stockDetail && <h4 id="stockChange">{stockDetail.percentChange}%</h4>}  
                </div>
                <div className="stockButtons">
                    <div className="watchButton" onClick={addWatchlist}>watch</div>
                    <div className="buyShares">
                    <input type="number" min="0" className="stockCount" onChange={setShareNumber} value={shares}/>
                    <div className="buyButton" onClick={addPortfolio}>buy shares</div>
                    <input type="number" min="0" className="stockCount" onChange={setSellNumber} value={sell}/>
                    <div className="buyButton" onClick={sellPortfolio}>sell shares</div>
                    </div>
                </div>
            </div>
            <div className="stockChart">
                <Line data={chart}/>
            </div>
        </div>
    )
}

export default Stock;