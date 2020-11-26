import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Stock from '../Stock';
import Portfolio from '../PortfolioWatchlist/Portfolio'
import Watchlist from '../PortfolioWatchlist/Watchlist'
import './mainBody.css'


function Main() {

  const stock = useSelector(state => state.search.stock)

  const [stockDetail, setStockDetail] = useState()

  useEffect(() => {
      setStockDetail(stock)
  },[stock])

  console.log("render")
  return (
    <div className="mainBody">
        <div className="stockContainer">
            {stockDetail && <Stock />}
        </div>
        <div className="listsContainer">
            <Portfolio />
            <Watchlist />
        </div>
    </div>
  );
}

export default Main;
