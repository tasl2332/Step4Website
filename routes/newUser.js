var express = require('express');
var db = require('../database');
var app = express();
module.exports = app;

//Default route that just renders the template
app.get('/', function (request, response) {
   response.render('newUser', {title: 'Please Create a New User'})
   //console.log('User is in newUser.ejs')
});

app.post('/', function(request, response){
    request.assert('userName','User name is required').notEmpty();
    request.assert('password_main','Password is required').notEmpty();
    request.assert('passwordCheck','Password is required').notEmpty();
    request.assert('displayName','Display name is required').notEmpty();
    request.assert('displayName','Display name must only be 3 characters').isLength({max: 3}).withMessage('Display Name needs 3 characters');
    request.assert('displayName','Display name must only be 3 characters').isLength({min: 3}).withMessage('Display Name needs 3 characters');
    request.assert('password_main','Passwords not equal').equals(request.body.passwordCheck);
    var errors = request.validationErrors();
    if(!errors){
        var newUser = {
            userName: request.sanitize('userName').escape().trim().replace(';',''),
            password: request.sanitize('password_main').escape().trim().replace(';',''),
            displayName: request.sanitize('displayName').escape().trim().toUpperCase()
        };
        //console.log(newUser);
        var queryUsername = "select username from users where username = '" + newUser.userName + "';";
        var queryDisplayName = "select displayName from users where displayName = '" + newUser.displayName + "';";
        var queryAddNewUser = "INSERT INTO users (username,password,displayName) values ('" + newUser.userName + "', '" + newUser.password + "', '" + newUser.displayName + "');";
        var queryAddNewUserHighscore = "INSERT INTO highscores (displayName,score) values ('" + newUser.displayName + "', 0 );";
        //console.log(queryAddNewUser);
        //console.log(queryAddNewUserHighscore);
        db.query(queryUsername,function(err,rows,fields){
            if(err)throw err;
            else{
                //console.log(rows);
                if(rows == ""){
                    //console.log("In if");
                    //checkUsername = true;
                    db.query(queryDisplayName,function(err,rows,fields){
                        if(err)throw err;
                        else{
                            //console.log(rows);
                            if(rows == ""){
                                db.query(queryAddNewUser,function(err,rows,fields){
                                    if(err)throw err;
                                    else{
                                        //console.log("Success");
                                    }
                                });
                                db.query(queryAddNewUserHighscore,function(err,rows,fields){
                                    if(err)throw err;
                                    else{
                                        //console.log("Success");
                                    }
                                });
                                response.render('newUser', {title: 'Success!'});
                            }
                            else{
                                response.render('newUser', {title: 'Please choose a different DisplayName'});
                            }
                            
                        }
                    });
                }
                else{
                    response.render('newUser', {title: 'Please choose a different username'});
                }
            }
        });
        
    }else{
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error',error_msg);
        response.render('newUser', {title: 'Please fix input mistakes'});
    }
});

