const express = require('express')
const app = express()
const PORT = 5000
const ejs = require("ejs")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./routes/user.route")
app.use(cors())
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/",userRoute)

const URI = "mongodb+srv://petertechy01:Olanrewaju@my-project.w3cyijl.mongodb.net/school_portal?retryWrites=true&w=majority&appName=my-project"

mongoose.connect(URI)
.then(()=>{
    console.log("Mongodb iyaf connected")
})
.catch((err)=>{
    console.log("Unable to connect to mongodb")
    console.log(err)
})

app.listen(PORT, ()=>{
    console.log("Server is Running on port " + PORT)
})