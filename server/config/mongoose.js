const mongoose = require('mongoose');
const fs= require('fs');
const path =require('path');

//Mongoose Configuration
mongoose.connect('mongodb://localhost/Multiplayer'); //after localhost, type name of db you wish to use/create

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function (file){
    if (file.indexOf('.js')>=0){
        require(models_path +'/'+ file);
    }
});


// mongoose.Promise = global.Promise; // Use native promises
