const express=require('express'); 
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const bodyParser = require("body-parser");
const passport = require('passport');
const passportJWT=require('./config/passport-jwt-strategy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:"application/json" }));
//initiling passport
app.use(passport.initialize());
app.use('/',require('./routes/index'));
//running server
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;