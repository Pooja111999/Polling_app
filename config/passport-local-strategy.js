const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

//Authantication using passport

passport.use(new LocalStrategy({
        usernameField: 'email',
        // passReqToCallback: true

    },
    async function(email, password, done){
        //find the user and stablish the identity
        
        let user = await User.findOne({email: email});
        
        if(!user || user.password != password ){
            // req.flash('error', 'Invalid Username/ Password');
            return done(null, false);
        }
        return done(null, user);

        
    }
));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log("serialize call");
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser( async function(id, done){
    let user = await User.findById(id);
  //  if(err){
        //  console.log('error in finding user ---> passport', err);
        // return done(err);
   //  }
    return done(null, user);
});
// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not sign-in
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated){
        //req.user contains the current sidned user from the session cookie and we are just sending this  to the locals for the views
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;