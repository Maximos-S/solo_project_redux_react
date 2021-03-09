const express = require('express');
const asyncHandler = require('express-async-handler');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Portfolio, Watchlist, Stock, StocksInList} = require('../../db/models');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });
    const portfolio = await Portfolio.create({userId: user.id})
    const watchlist = await Watchlist.create({userId: user.id})
    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

//get portfolio
router.post("/portfolio", asyncHandler(async (req, res) => {
    let user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock, {model: StocksInList, where: {portfolioId: req.body.userId}}]}]})
    if (!user.Portfolio) {
      user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Portfolio, include: [Stock] },]})
    }
    const portfolio = user.Portfolio
    res.json({portfolio})
}))
//get watchlist
router.post("/watchlist", asyncHandler(async (req, res) => {
    const user = await User.findOne({where: {id: req.body.userId}, include:  [{model: Watchlist, include: [Stock,],}], })
    const watchlist = user.Watchlist
    console.log("########",watchlist)

    res.json({watchlist})
}))

module.exports = router