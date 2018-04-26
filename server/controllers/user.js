var mongoose = require('mongoose');
var User = mongoose.model('User');
const bcrypt = require("bcryptjs");
var Active = mongoose.model('Active');

// var session = GET CURRENT USER ID!

module.exports =
    {
        create: function (req, res) {
            var user = new User({ first: req.body.first, last: req.body.last, email: req.body.email,username: req.body.username, password: req.body.password })
            User.find({ email: req.body.email }, function (error, user) {
                if (user.length >= 1) {
                    res.json({ "emailError": "That email already exists in the database. Choose a different one." })
                }
                if (user.length >= 1) {
                    res.json({ "usernameError": "That username already exists in the database. Choose a different one." }) /////////////////////
                }
                else {
                    console.log(req.body.password)
                    console.log(req.body.confirm)
                    if (req.body.password == req.body.confirm) {
                        var hash = bcrypt.hashSync(req.body.password, 8)
                        var user = new User
                            ({
                                first: req.body.first,
                                last: req.body.last,
                                email: req.body.email,
                                username:req.body.username,
                                password: hash,
                            });
                        console.log(user)
                        user.save(function (err) {
                            if (err) {
                                res.render("home", { errors: user.errors })
                            }
                            else {
                                User.findOne({ email: req.body.email }, function (error, tempuser) {
                                    if (error) {
                                        res.json({ error: user.errors })
                                    }
                                    else {

                                        console.log(tempuser)

                                        var newActive = new Active({
                                            email: req.body.email,
                                            username:req.body.username,
                                            id: tempuser._id
                                        });
                                
                                        newActive.save()
                                        var newuserid = newActive.id;
                                        console.log("data received");
                                        res.json({ message: "success", user: user });
                                    }
                                })
                            }
                        })
                    }
                    else {
                        res.json({ "Password Error": "Passwords do not match." })
                    }
                }
            })
        },

        // check: function(req,res){
        //     res.json({'response':true})

        // },

        login: function (req, res) {
            console.log("at controller")
            // console.log(req.body.logemail)
            console.log(req.body.email)
            User.findOne({ username: req.body.username }, function (err, user) //this is grabbing an array of users, which is an array of 1 in this case
            {
                console.log(user)
                if (err) {
                    res.render("index", { errors: user.errors })
                }
                else {

                    if (user) //check if there is a list of user objects greater than 0, if yes user exists
                    {
                        console.log("login controller here")
                        console.log(user.password, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        if (bcrypt.compare(req.body.password, user.password)) {
                            req.session.user = user;
                            console.log(user.password);
                            res.json({ message: "success", user: user });
                        }
                        else {
                            res.json({ error: "Password is incorrect." })
                        }
                    }

                }
            })
        },

        logout: function(req, res)
        {
            console.log("at controller for logout")
            // Active.removeById({email: session})
            req.session.destroy(function (err)
            {
               if(err)
               {
                   res.json({error: "something went wrong"})
               } 
               else
               {
                   res.render("index")
               }
            })
        },
            


        getUsers: function (req, res) {
            User.find({}, function (err, users) {
                if (err) {
                    console.log("Returned error", err);
                    res.json({ message: "Error", error: err.message })
                }
                else {
                    console.log(users)
                    res.json({data: users })
                }
            }).sort('field first')
        },
        getScores: function (req, res) {
            User.find({}, function (err, users) {
                if (err) {
                    console.log("Returned error", err);
                    res.json({ message: "Error", error: err.message })
                }
                else {
                    console.log(users)
                    res.json({data: users })
                }
            }).sort('field score')
        }
    }
