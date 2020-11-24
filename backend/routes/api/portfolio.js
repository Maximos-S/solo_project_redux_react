const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")
const { User, Portfolio, Watchlist, Stock} = require('../../db/models');



router.post('/', asyncHandler(async (req,res) => {
    console.log(req.body)
    const stock = req.body.stock
    const shares = req.body.shares
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] }]})
    const cost = stock.latestPrice * shares

    console.log("user", user.Portfolio)

    res.json({stock})
}))

module.exports = router;