const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const {Stock} = require("../../db/models")

//search for stock and create new stock
router.post('/', asyncHandler(async (req,res) => {
    const searchTerm = req.body.searchTerm.searchTerm
    const url = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.IEX_SANDBOX_API}`
    const url2 = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/chart/1m?token=${process.env.IEX_SANDBOX_API}`

    const chartRes = await fetch(url2)
    let chart = await chartRes.json();
    // console.log("stock2", chart)

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
    // console.log("labels", labels)
    //     const data = {
        //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        //   datasets: [
            //     {
                //       label: "First dataset",
                //       data: [33, 53, 85, 41, 44, 65],
                //       fill: true,
                //       backgroundColor: "rgba(75,192,192,0.2)",
                //       borderColor: "rgba(75,192,192,1)"
                //     },
                //     {
                    //       label: "Second dataset",
                    //       data: [33, 25, 35, 51, 54, 76],
                    //       fill: false,
                    //       borderColor: "#742774"
                    //     }
                    //   ]
                    // };
    
    const result = await fetch(url)
    let stock = await result.json();
    console.log(chartData)
    stock = stock.quote
    const symbol = stock.symbol
    const savedStock = await Stock.findOne({where: {symbol: symbol}})
    let lastUpdated = new Date()
    lastUpdated = lastUpdated.toLocaleDateString("en-Us")
    if (savedStock) {
        const updated = await savedStock.update({
            lastUpdated, 
            percentChange: stock.changePercent,
            latestPrice: stock.latestPrice,
        });
        stock = updated
        const stockData = {stock, chartData}
        console.log(stockData)
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
    
    
    const stockData = {stock, chartData}
    res.json({stockData})
}))

module.exports = router;