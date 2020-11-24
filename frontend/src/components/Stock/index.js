import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as sessionActions from '../../store/search';

function Stock() {
    const stock = useSelector(state => state.search.stock)

    const [stockDetail, setStockDetail] = useState()
    useEffect(() => {
        setStockDetail(stock)
    },[stock])

    console.log(stockDetail)
    return (
        <div className="stockBox">
            {stockDetail && stockDetail.symbol}
            {stockDetail && stockDetail.companyName}
            {stockDetail && stockDetail.latestPrice}
            {stockDetail && `${stockDetail.changePercent}%`}
        </div>
    )
}

export default Stock;