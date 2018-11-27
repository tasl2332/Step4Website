var express = require('express');
var app = express();
//Default route that just renders the template
app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('index', {title: 'Step4 Website'})
});

module.exports = app;