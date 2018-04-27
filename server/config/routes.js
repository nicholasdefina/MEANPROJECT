var path = require('path');
var users = require('../controllers/user.js')

module.exports = function (app) {  //exporting routes

    // app.get('/api/active/:id', function(req,res){
    //     console.log("at routes for checkID");
    //     users.check(req, res)
    // })

    app.post('/api/users/register', function (req, res) {  //create user route
        console.log("at routes for create user")
        users.create(req, res)
    })

    app.post('/api/users/login', function (req, res) {  //login user route
        console.log("at routes for login user")
        users.login(req, res)
    })

    app.get('/api/users', function (req, res) {  //get all users with sorted names route
        users.getUsers(req, res)
    })
    app.get('/api/users/scores', function (req, res) {  //get all users with sorted scores route
        users.getScores(req, res)
    })

    app.get('/api/users/logout/:username', function (req, res){
        users.logout(req,res)
    })
    // app.delete('/api/users/:id', function(req, res){  //delete user
    //     pets.deleteUser(req, res)
    // })
    // app.get('/api/users/:id', function(req, res){  //find specific user by id
    //     pets.getUserById(req, res)
    // })
    // app.put('/api/users/:id', function(req, res){  //update user by id
    //     console.log("at the routes for update")
    //     pets.updateUser(req, res)
    // })
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))  //route for exceptions
    });
}