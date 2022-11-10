const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollNo:{
        type:Number,
        required:true
    },
    marks: {
        type: [{
            subject: {
                type: String,
                required: true
            },
            marks: {
                type: Number,
                required: true
            },
            _id:false
        }

        ]

    },
    isdeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

module.exports = mongoose.model("Student",studentSchema)