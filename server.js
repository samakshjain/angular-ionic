var express = require('express');
var app = express();
// var mysql     = require('mysql');
// var passport  = require('passport');

// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google').Strategy;

//for google auth
// passport.use(new GoogleStrategy({
//     returnURL: '/login/auth/google/return',
//     realm: '/'
//   },
//   function(identifier, profile, done) {
//     User.findOrCreate({ openId: identifier }, function(err, user) {
//       done(err, user);
//     });
//   }
// ));

// app.get('/login/auth/google', passport.authenticate('google'));
// app.get('/auth/google/return', 
//   passport.authenticate('google', { successRedirect: '/',
//                                     failureRedirect: '/login' }));

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'freakoupon',
//   password : 'FKPSecureAccess',
//   database : 'freakoupon'
// });


app.listen(process.env.PORT || 1337);

