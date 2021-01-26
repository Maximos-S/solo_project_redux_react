const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const csurf = require("csurf");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize')

const {environment} = require('./config');

const isProduction = environment === 'production';

const app = express();

const routes = require('./routes');

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());


if (!isProduction) {
    app.use(cors());
}

app.use(helmet({
    contentSecurityPolice: false
}));

app.use(
csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
    },
})
);
    
app.use(routes)

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve('../frontend/build')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api  
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(201).json({});
  });
}

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.")
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."]
    err.status = 404;
    next(err)
})

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error'
    }
    next(err);
})

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    })
})

module.exports = app;

