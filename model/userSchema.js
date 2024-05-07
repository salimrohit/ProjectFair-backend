//schema for users collection in database 

//import mongoose
const mongoose = require('mongoose') 

//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true

    },
    mailId:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String      
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    }

})

//creating a model
const users = mongoose.model('users',userSchema) //first arg-name of the collection//2nd arg - name of schema //small letters and plural - collection name

//export
module.exports = users
