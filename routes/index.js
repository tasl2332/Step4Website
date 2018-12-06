var express = require('express');
var app = express();
//Default route that just renders the template

app.get('/', function (request, response) {
   // render the views/index.ejs template file
	if(request.session.user && request.cookies.user_sid){
		var loginString = "Welcome " + request.session.user + "!";
		response.render('index', {title: loginString})
	}else{
		response.redirect('/login');
	}
});

module.exports = app;