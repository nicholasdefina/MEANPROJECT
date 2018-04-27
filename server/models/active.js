var mongoose = require('mongoose')

var Schema = mongoose.Schema; //define Schema variable

var ActiveSchema = new mongoose.Schema({  //defining active schema
    username: {type:String}
}, { timestamps: true })


mongoose.model("Active", ActiveSchema) //set User model by passing through UserSchema
var Active = mongoose.model("Active") //store model in User variable