const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//User Schema
const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    register_date: {type: Date, default: Date.now()}
})


let saltRound = 10
userSchema.pre("save", function(next){
    bcrypt.hash(this.password,saltRound, (err,hashedPassword)=>{
        if(err){
            console.log(err, "Password could not be hashed")
        }else{
            this.password = hashedPassword
            next()
        }
    })
})

userSchema.methods.validatePassword = function(password,callback){
    console.log(password, this.password)
    bcrypt.compare(password,this.password, (err,same)=>{
        if(!err){
            console.log(same)
            callback(err,same)
        }
        else{
            next()
        }
    })
}

//User Model
const userModel = mongoose.model("User_Data", userSchema, "User_Data")

module.exports = userModel
