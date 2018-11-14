var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

app.get('/', function (request, response) {
    var displayList = [];
    // TODO: Initialize the query variable with a SQL query
    // that returns all the rows in the ‘store’ table
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
        response.render('scoreboard/list', {title:"Scoreboard",data:displayList});
    });


});