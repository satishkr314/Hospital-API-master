const passport=require('passport');
//Using jwt Strategy for authentication
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const Doctor=require('../models/doctor');


// extracting token from header
let opts={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "hospitalapi"
}
// authenticate using jwt
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    Doctor.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log('Error in finding Doctor');return;
        }
        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports=passport;