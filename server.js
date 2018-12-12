//Step4Ever
var express = require('express');
var app = express();
var Cookies = require('cookies')
app.set('view engine', 'ejs');

var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//Figure out what exactly is going on here
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'step4Ever',
    user: 'NaU',
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 60000}
}));


app.use(flash());

//Routes for the page we are using. This is probably the best spot to put in a case for if the user has logged in
var index = require("./routes/index");
var scoreboard = require('./routes/scoreboard');
var loginPage = require('./routes/login');
var newUserPage = require('./routes/newUser');
var logoutPage = require('./routes/logout');
var gamePage = require('./routes/game');
app.use('/scoreboard', scoreboard);
app.use('/',index);
app.use('/login',loginPage);
app.use('/createUser',newUserPage);
app.use('/logout',logoutPage);
app.use('/game',gamePage);



var port = process.env.PORT;
//var port = 4000;
app.listen(port, function () {
    console.log('Server running Heroku:' + port)
});