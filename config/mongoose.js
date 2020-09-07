const mongoose = require('mongoose');
//Connecting with databse mongodb
mongoose.connect('mongodb://localhost/CoranaDetails',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
// Confirming connection of database
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;