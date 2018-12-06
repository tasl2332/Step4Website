var express = require('express');
var app = express();
//Default route that just renders the template
app.get('/', (req, res) => {
        res.clearCookie('user_sid');
        res.redirect('/login');
        res.redirect('/login');
    
});

module.exports = app;