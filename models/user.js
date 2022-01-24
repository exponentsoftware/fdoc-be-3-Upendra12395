// Add User collection to store below user information:
// User name
// email
// phone
// created at
// updated at
// role
// Add validation on phone and email from the Mongoose schema itself with error message handling
// Link Todo list with User

const mongoose = require('mongoose')
//const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required : true
    },
    email: {
        type: String,
        //validate: [ isEmail, 'invalid email' ]
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type: Number,
        match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone no'],
        required: true
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type : String,
        required : true
    },
    todoList:{
        type : Array
    }
},{timestamps : true})
