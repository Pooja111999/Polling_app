const express = require('express');

const router = express.Router();

 const homecontrol = require('../controller/homecontroller');

 const passport = require('passport');


//router.get('/',homecontrol.home);
router.get('/sign-up',homecontrol.sign_up);
router.get('/sign-in',homecontrol.sign_in);

router.get('/',homecontrol.getdata);

router.post('/createvote',homecontrol.createvote)


 router.post('/user/signup',homecontrol.create);
 //router.get('/user/signin',homecontrol.createSession);

 router.post('/user/signin',passport.authenticate('local',{failureRedirect:'/user/signin'}) , homecontrol.createSession);

module.exports = router;
