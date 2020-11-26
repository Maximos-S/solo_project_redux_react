import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Stock from '../Stock';
import Portfolio from '../PortfolioWatchlist/Portfolio'
import Watchlist from '../PortfolioWatchlist/Watchlist'
import './mainBody.css'
import News from '../Stock/News';


function Main() {

  const stock = useSelector(state => state.search.stock)
  const news = useSelector(state => state.search.news)

  const [stockDetail, setStockDetail] = useState()

  useEffect(() => {
      setStockDetail(stock)
  },[stock])

  console.log("render")
  return (
    <div className="mainBody">
        <div className="stockContainer">
            {stockDetail && <Stock />}
            <div>
              {news && news.map((story, idx) => (
                <News key={idx} story={story} />
              ))}
            </div>
        </div>
        <div className="listsContainer">
            <Portfolio />
            <Watchlist />
        </div>
    </div>
  );
}

export default Main;
