const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const {Stock, Portfolio, StocksInList, User} = require("../../db/models")

//search for stock and create new stock
router.post('/', asyncHandler(async (req,res) => {
    const searchTerm = req.body.searchTerm.searchTerm
    const url = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.IEX_SANDBOX_API}`
    const url2 = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/chart/1m?token=${process.env.IEX_SANDBOX_API}`
    const url3 = `https://cloud.iexapis.com/stable/stock/${searchTerm}/news/1m?token=${process.env.IEX_CLOUD_API}`

    const chartRes = await fetch(url2)
    let chart = await chartRes.json();
    const newsRes = await fetch(url3)
    let news = await newsRes.json();

    const labels = chart.map(data => {
        return data.date.slice(8)
    })
    let length = chart.length
    let start;
    let end;

    const data = chart.map((data, idx) => {

        if (idx === 0) start = data.close
        if (idx === length - 1) end = data.close
        return data.close
    })

    let borderColor;

    if (start <= end) {
        borderColor = "rgb(0,200,5)"
    } else {
        borderColor = "rgb(255,80,0)"
    }

    const chartData = {
        labels,
        datasets: [

            {label: "Last Month",
            data,
            borderColor}
        ]
        
    }

    
    const result = await fetch(url)
    let stock = await result.json();
    stock = stock.quote
    const symbol = stock.symbol

    const portfolioId = req.body.searchTerm.portfolioId
    let savedStock = await Stock.findOne({where: {symbol: symbol}, include:  [{model: Portfolio, include: [Stock] }, {model: StocksInList, where: {portfolioId}}]})
    if (!savedStock) {
        savedStock = await Stock.findOne({where: {symbol: symbol}, include:  [{model: Portfolio, include: [Stock] },]})
    }
    let lastUpdated = new Date()
    lastUpdated = lastUpdated.toLocaleDateString("en-Us")

    if (savedStock) {
        const updated = await savedStock.update({
            lastUpdated, 
            percentChange: stock.changePercent,
            latestPrice: stock.latestPrice,
        });
        stock = updated
        const stockData = {stock, chartData, news}
        return res.json({stockData})
    }
    
    const companyName = stock.companyName
    
    stock = await Stock.create({
        symbol,
        companyName,
        percentChange: stock.changePercent,
        latestPrice: stock.latestPrice,
        lastUpdated
    })
    
    
    const stockData = {stock, chartData, news}
    res.json({stockData})
}))




module.exports = router;