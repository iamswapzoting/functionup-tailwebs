const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
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
            _id: false
        }

        ]

    },
    teacherId: {
        type: ObjectId,
        ref: "teacher",
        required: true

    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model("Student", studentSchema)