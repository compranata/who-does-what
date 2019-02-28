// ./app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./config/mdb-connection.js');

const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('x-powered-by', false);

app.use('/', indexRouter);

module.exports = app;
