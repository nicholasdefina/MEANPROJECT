//----------begin generic copy/paste----------

//Requirements as constants
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");


app.use(session({
    secret: "meowmeowmeow",
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
// app.set("views", path.join(__dirname, "/views")); THESE ARE NO LONGER NEEDED BECAUSE THEY LIVE IN ANGULAR


const path = require("path");
app.use(express.static(path.join(__dirname, '/public/dist')))
app.set('views', path.join(__dirname, '/public/dist'))


require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);


// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));


// Tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});

//----------end generic config---------------------------------------------------------------------------------

