const { Router } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")


app.use(express.json())


mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true})
.then(()=>{console.log("MongoDb connected")})
.catch((err)=>{console.log(err)})

app.use("/",route)

app.listen(4000,()=>{
    console.log("Port is listen on port 4000");
})