const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const {Stock} = require("../../db/models")

//search for stock and create new stock
router.post('/', asyncHandler(async (req,res) => {
    const searchTerm = req.body.searchTerm.searchTerm
    const url = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.IEX_SANDBOX_API}`

    const result = await fetch(url)
    let stock = await result.json();
    stock = stock.quote
    const symbol = stock.symbol
    const savedStock = await Stock.findOne({where: {symbol: symbol}})
    if (savedStock) {
        stock = savedStock.dataValues
        return res.json({stock})
    }

    // console.log("stockdeatails", stock)
    const companyName = stock.companyName


    stock = await Stock.create({
        symbol,
        companyName,
        percentChange: stock.changePercent,
        latestPrice: stock.latestPrice
    })
    res.json({stock})
}))

module.exports = router;