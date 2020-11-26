const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const { User, Portfolio, Watchlist, Stock, StocksInList} = require('../../db/models');


//add stock to watchlist
router.post('/', asyncHandler(async (req,res) => {
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Watchlist, include: [Stock] }]})
    const watchlistId = user.Watchlist.id
    const stockId = stock.id
    const oldStock = await StocksInList.findOne({where: {stockId}})

    if (oldStock && oldStock.portfolioId) {
        return res.json({watchlist})
    }
    const watchlist = user.Watchlist
    
    if (oldStock) {
        await oldStock.update({
            watchlistId
        });
        res.json({watchlist})
        return
    }

    const newStock = await StocksInList.create({watchlistId, stockId})
    
    res.json({watchlist})
}))

//remove from watchlist

router.delete('/', asyncHandler(async (req,res) => {
    const stockId = req.body.stockId
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Watchlist, include: [Stock] }]})
    const watchlistId = user.Watchlist.id
    const oldStock = await StocksInList.findOne({where: {stockId, watchlistId}})
    
    const watchlist = user.Watchlist

    await oldStock.update({
        watchlistId: null
    })


    res.json({watchlist})

}))
module.exports = router;