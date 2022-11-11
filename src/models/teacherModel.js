const mongoose = require("mongoose")


const teacherSchema = mongoose.Schema({
    fname :{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:flase
    }
},{
    timestamps:true
})

module.exports = mongoose.model("teacher",teacherSchema)