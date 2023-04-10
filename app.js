const express = require('express');

const app = express();
const cookieparser = require('cookie-parser');
// const router = express.Router();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

// used for session cookie
 const session = require('express-session');
 const passport = require('passport');
 const passportLocal = require('./config/passport-local-strategy');
 const MongoStore = require('connect-mongodb-session')(session);

app.use(express.urlencoded({extended:true}));

app.use(cookieparser());

app.use(express.static('./assets'));


  

app.set('view engine','ejs');
app.set('views','./view');

 app.use(session({
   name: 'Codial',
   //TODO change the secret before deployment in production mode
   secret: 'something',
  saveUninitialized: false,
  resave: false,
  cookie:{
      maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore(       {
           uri: 'mongodb://127.0.0.1/my_signin',
           AutoRemove: 'disabled'
      },
       function(err){
           console.log(err || 'connect mongodb setup is ok');
      }   )
 }));

 app.use(passport.initialize());
 app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./Routes/route'));



app.listen(3000,()=>{
  console.log('app listening on port 3000');
})
