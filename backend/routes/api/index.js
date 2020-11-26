const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const searchRouter = require('./search.js');
const portfolioRouter = require('./portfolio.js');
const watchlistRouter = require('./watchlist.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);
router.use('/portfolio', portfolioRouter);
router.use('/watchlist', watchlistRouter);

// router.get("/hello/world", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.send("Hello World!");
// });




module.exports = router;
