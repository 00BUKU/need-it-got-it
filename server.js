
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const storesRouter = require('./routes/stores');
const itemsRouter = require('./routes/items');

const app = express();


require('./config/database');

require('./config/passport');




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(function (req, res, next) {
  res.locals.user = req.user;

  next();
});


app.use('/', indexRouter);
app.use('/stores', storesRouter);
app.use('/', itemsRouter);



app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
