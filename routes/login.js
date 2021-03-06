var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

//Default route that just renders the template
app.get('/', function (request, response) {
   response.render('login', {title: 'Please Login'})
});

app.post('/', function(request, response){
    request.assert('userName','User name is required').notEmpty();
    request.assert('password_main','Password is required').notEmpty();
    var errors = request.validationErrors();
    if(!errors){
        var loginCreds = {
            userName: request.sanitize('userName').escape().trim().replace(';',''),
            password: request.sanitize('password_main').escape().trim().replace(';','')
        };
       // console.log(loginCreds);
        var queryUsername = "select username from users where username = '" + loginCreds.userName.toString().toLowerCase() + "';";
        var queryPass = "select password, displayName from users where username = '" + loginCreds.userName.toString().toLowerCase() + "' AND password = '" + loginCreds.password + "';";
        
        //console.log(queryAddNewUserHighscore);
        db.query(queryUsername,function(err,rows,fields){
            if(err){
                response.render('login', {title: 'Please check your Username'});
            }
            else{
               // console.log(rows);
                //console.log(rows);
                if(rows != ""){
                    if(rows[0].username.toString() == loginCreds.userName.toString()){
                        //console.log("In if");
                        db.query(queryPass,function(err,rows,fields){
                            if(err)throw err;
                            else{
                                //console.log(rows);
                                if(rows!= ""){
                                    if(rows[0].password.toString() == loginCreds.password.toString()){
                                       //console.log("Login success");
                                       request.session.user = rows[0].displayName;
                                       var loginString = "Welcome " + rows[0].displayName + "!";
                                       response.render('index',{title: loginString}); 
                                   }else{
                                    response.render('login', {title: 'Please check your password'});
                                }
                                }
                                else{
                                    response.render('login', {title: 'Please check your password'});
                                }
                                
                            }
                        });
                    }
                    else{
                        response.render('login', {title: 'Please check your Username'});
                    }
                    
                }
                else{
                        response.render('login', {title: 'Please check your Username'});
                    }
            }
        });
        
    }else{
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error',error_msg);
        response.render('login', {title: 'Please fill in all fields'});
    }
});

