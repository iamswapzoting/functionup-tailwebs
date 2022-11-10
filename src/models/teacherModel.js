const mongoose = require("mongoose")


const teacherSchema = mongoose.Schema({
    fname :{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("teacher",teacherSchema)