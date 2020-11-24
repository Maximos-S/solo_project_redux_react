const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch")


router.post('/', asyncHandler(async (req,res) => {
    console.log("search", req.body)
    const searchTerm = req.body.searchTerm.searchTerm
    const url = `https://sandbox.iexapis.com/stable/stock/${searchTerm}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.IEX_SANDBOX_API}`

    const result = await fetch(url)

    let stock = await result.json();
    console.log(stock);
    res.json({stock})
}))

module.exports = router;