var express = require('express');
var app = express();
//Default route that just renders the template
var compression = require('compression');
module.exports = app;

app.get('/', function (request, response) {
	if(request.session.user && request.cookies.user_sid){
		console.log("Rendering game")
		app.use(compression());
		app.use(express.static(__dirname ));
		response.sendFile(__dirname);
		//response.render('game', {title: loginString})
	}else{
		console.log("Other else?")
		response.redirect('/login');
	}
});
