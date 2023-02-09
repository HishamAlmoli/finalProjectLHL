const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors') 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newChildRouter = require('./routes/addNewChild');
const activitesRouter = require('./routes/activites');
const childrenRouter = require('./routes/children');
const bodyParser = require('body-parser'); 
const app = express();
app.use(bodyParser.json()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/newChild', newChildRouter);
app.use('/activites', activitesRouter);
app.use('/children', childrenRouter);

module.exports = app;
