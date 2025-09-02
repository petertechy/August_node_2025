const mongoose = require("mongoose")


//User Schema
const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    register_date: {type: Date, default: Date.now()}
})

//User Model

const userModel = mongoose.model("User_Data", userSchema, "User_Data")

module.exports = userModel