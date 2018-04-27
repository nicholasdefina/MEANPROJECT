//----------begin generic copy/paste----------

//Requirements as constants
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const mongoose = require('mongoose')

var router = express.Router();
var debug = require('debug')('angular2-nodejs:server');
var http = require('http');

var ChatSchema = new mongoose.Schema({
    room: String,
    nickname: String,
    message: String,
    updated_at: { type: Date, default: Date.now },
});

mongoose.model('Chat', ChatSchema);
var Chat = mongoose.model('Chat');

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
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});

//----------end generic config---------------------------------------------------------------------------------

var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{
    console.log('new connection made.');

    socket.on('join', function(data){
        //joining
        socket.join(data.room);
        console.log(data.user + 'joined the room : ' + data.room);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });

    socket.on('leave', function(data){
        console.log(data.user + 'left the room : ' + data.room);
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
        socket.leave(data.room);
    });

    socket.on('message',function(data){
        if(socket.rooms.hasOwnProperty(data.room)){
            io.in(data.room).emit('new message', {user:data.user, message:data.message});
        }
    })
    socket.on('type', function(data){
        socket.broadcast.emit('typing', { message:' is typing'});
    });
    socket.on('stop typing', function(){
        console.log("SERVER EMMITING")
        socket.broadcast.emit('stop typing')
    })
});