var mongoose = require('mongoose')

var Schema = mongoose.Schema; //define Schema variable

var UserSchema = new mongoose.Schema({  //defining user schema
    first: {
        type: String, required: true, minlength: 2,
        validate: {
            validator: function (first) {
                return /^[A-Za-z ,.'-]+$/i.test(first);
            },
            message: "First Name cannot contain any special characters!"
        }
    },
    last: {
        type: String, required: true, minlength: 2,
        validate: {
            validator: function (last) {
                return /^[a-z ,.'-]+$/i.test(last);
            },
            message: "Last Name cannot contain any special characters!"
        }
    },
    email: {
        type: String, required: true, unique: [true, "Email address already in database!"],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: "Invalid Email Address!"
        }
    },

    password: {
        type: String, required: true, minlength: 8,
        validate:
            {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
                },
                message: "Password failed validation, must be 8 characters long."
            }
    },

    username: {
        type: String, required: true, minlength: 4, unique: [true, "Username already in database!"]
        
        },



    score: { type: Number, default: 0 },


}, { timestamps: true })


mongoose.model("User", UserSchema) //set User model by passing through UserSchema
var User = mongoose.model("User") //store model in User variable