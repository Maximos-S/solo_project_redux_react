const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const { User, Portfolio, Watchlist, Stock, StocksInList} = require('../../db/models');


//add stock to watchlist
router.post('/', asyncHandler(async (req,res) => {
    // console.log(req.body)
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Watchlist, include: [Stock] }]})
    const watchlistId = user.Watchlist.id
    const stockId = stock.id
    const oldStock = await StocksInList.findOne({where: {stockId}})

    const watchlist = user.Watchlist
    
    if (oldStock) {
        console.log("oldstock cost 1",oldStock.cost)
        oldStock.watchlistId = watchlistId;
        await oldStock.save();
        res.json({watchlist})
        return
    }

    const newStock = await StocksInList.create({watchlistId, stockId})
    
    res.json({watchlist})
}))

//remove from watchlist

// router.delete('/', asyncHandler(async (req,res) => {
//     // console.log(req.body)
//     const stock = req.body.stock
//     const shares = req.body.shares
//     const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})
//     const cost = stock.latestPrice * shares
//     const portfolioId = user.Portfolio.id
//     const stockId = stock.id
//     // console.log("user", user.Portfolio)
//     const oldStock = await StocksInList.findOne({where: {stockId}})
//     user.Portfolio.buyingPower = Number(user.Portfolio.buyingPower) + Number(cost)
//     await user.Portfolio.save();
//     const portfolio = user.Portfolio

    
//     if (oldStock) {
//         console.log("oldstock cost 1",oldStock.cost)
//         oldStock.shares = Number(oldStock.shares) - Number(shares)
//         if(oldStock.shares <= 0) {
//             await oldStock.destroy()
//         }
//         oldStock.cost = Number(cost) - Number(oldStock.cost)
//         await oldStock.save();
//         res.json({portfolio})
//         return
//     }
    
//     res.json({portfolio})
// }))
module.exports = router;