var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {
    if(request.session.user && request.cookies.user_sid){
        var displayList = [];
        //Query gets the list of values but with having an order to it.
        var query = 'select * from highscores ORDER BY score DESC';

        db.query(query,function(err,rows,fields){
            if(err)throw err;
            else{
                for(var i = 0; i < rows.length; i++){
                    var row = {
                        'score':rows[i].score,
                        'displayName':rows[i].displayName
                    }
                    displayList.push(row);
                }
            }
            response.render('scoreboard/list', {title:"Scoreboard",data:displayList,userDisName:request.session.user});
        });
    }else{
        response.redirect('/login');

    }


});