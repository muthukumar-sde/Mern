const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var passConfig = require('../config/passport');

// Create local strategy
const localOptions = { usernameField: 'username', passwordField:"password" };
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {   
    User.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false,{message: "User Not found"}); }

        // compare passwords - is `password` equal to user.password?
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err){
                // throw err;
                console.log(err)
            } 
            if(isMatch) {
                console.log('correct');
                return done(null, user);
            }
            else {
                console.log('not correct');
                return done(null, false, {message: 'Password Incorrect'});
            }
        });
    });

});


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: passConfig.jwtSecret
  };
  
  // Create JWT strategy
  const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  
      // console.log(payload);
      // See if the user ID in the payload exists in our database
      User.findById(payload.sub, (err, user) => {
          if (err) { return done(err, false); }
          if (user) {
              // console.log(user)
              done(null, user);
          } else {
              done(null, false);
          }
      });
  
  });

passport.use(jwtLogin);  
passport.use('local',localLogin);
