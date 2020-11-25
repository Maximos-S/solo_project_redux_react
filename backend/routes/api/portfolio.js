const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const { User, Portfolio, Watchlist, Stock, StocksInList} = require('../../db/models');


//add stock to portfolio
router.post('/', asyncHandler(async (req,res) => {

    const stock = req.body.stock
    let shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})

    let cost = stock.latestPrice * shares
    const portfolioId = user.Portfolio.id
    const stockId = stock.id
    
    const oldStock = await StocksInList.findOne({where: {stockId}})

    //check to see if over drawing
    let buyingPower = user.Portfolio.buyingPower
    const portfolio = user.Portfolio
    if((buyingPower -= cost) < 0) return res.json({portfolio})

    
    if (oldStock) {

        shares = Number(shares) + Number(oldStock.shares)
        cost = cost + Number(oldStock.cost)
        await StocksInList.update({
            portfolioId,
            cost,
            shares,
            watchlistId: null
        },{where: {stockId}})
        user.Portfolio.buyingPower -= cost
        await user.Portfolio.save();
        res.json({portfolio})
        return
    }
    
    const newStock = await StocksInList.create({portfolioId, stockId, shares, cost})
    user.Portfolio.buyingPower -= cost
    await user.Portfolio.save();
    
    res.json({portfolio})
}))

//sell shares

router.delete('/', asyncHandler(async (req,res) => {
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})
    const cost = stock.latestPrice * shares
    const portfolioId = user.Portfolio.id
    const stockId = stock.id
    const oldStock = await StocksInList.findOne({where: {stockId}})
    const portfolio = user.Portfolio
    const oldShares = oldStock.shares
    
    if (oldStock) {
        oldStock.shares = Number(oldStock.shares) - Number(shares)
        if(oldStock && oldStock.shares <= 0) {
            user.Portfolio.buyingPower = Number(user.Portfolio.buyingPower) + Number(stock.latestPrice * oldShares)
            // oldStock.shares = null;
            // oldStock.portfolioId = null;
            await oldStock.destroy()
            await user.Portfolio.save();
            res.json({portfolio})
            return
        }
        user.Portfolio.buyingPower = Number(user.Portfolio.buyingPower) + Number(cost)
        await user.Portfolio.save();
        oldStock.cost = Number(cost) - Number(oldStock.cost)
        await oldStock.save();
        res.json({portfolio})
        return
    }
    
    user.Portfolio.buyingPower = Number(user.Portfolio.buyingPower) + Number(cost)
    await user.Portfolio.save();
    res.json({portfolio})
}))
module.exports = router;