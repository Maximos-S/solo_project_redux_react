const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const { User, Portfolio, Watchlist, Stock, StocksInList} = require('../../db/models');


//add stock to portfolio
router.post('/', asyncHandler(async (req,res) => {
    // console.log(req.body)
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})
    const cost = stock.latestPrice * shares
    const portfolioId = user.Portfolio.id
    const stockId = stock.id
    // console.log("user", user.Portfolio)
    const oldStock = await StocksInList.findOne({where: {stockId}})
    user.Portfolio.buyingPower -= cost
    await user.Portfolio.save();
    const portfolio = user.Portfolio
    
    if (oldStock) {
        console.log("oldstock cost 1",oldStock.cost)
        oldStock.shares = Number(shares) + Number(oldStock.shares)
        oldStock.cost = cost + Number(oldStock.cost)
        await oldStock.save();
        res.json({portfolio})
        return
    }

    const newStock = await StocksInList.create({portfolioId, stockId, shares, cost})
    
    res.json({portfolio})
}))

//sell shares

router.delete('/', asyncHandler(async (req,res) => {
    // console.log(req.body)
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})
    const cost = stock.latestPrice * shares
    const portfolioId = user.Portfolio.id
    const stockId = stock.id
    // console.log("user", user.Portfolio)
    const oldStock = await StocksInList.findOne({where: {stockId}})
    user.Portfolio.buyingPower = Number(user.Portfolio.buyingPower) + Number(cost)
    await user.Portfolio.save();
    const portfolio = user.Portfolio

    
    if (oldStock) {
        console.log("oldstock cost 1",oldStock.cost)
        oldStock.shares = Number(oldStock.shares) - Number(shares)
        if(oldStock.shares <= 0) {
            await oldStock.destroy()
        }
        oldStock.cost = Number(cost) - Number(oldStock.cost)
        await oldStock.save();
        res.json({portfolio})
        return
    }
    
    res.json({portfolio})
}))
module.exports = router;