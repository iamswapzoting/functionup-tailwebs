const { model } = require("mongoose")
const studentModel = require("../models/studentModel")



const createStudent = async function (req, res) {

    let data = req.body

    let name = req.body.name
    let rollNo = req.body.rollNo
    let teacherId = req.params.teacherId
    data.teacherId = teacherId
    let subject = req.body.marks.subject
    let marks = req.body.marks.marks
    let arr = []

    if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })
    if (!rollNo) return res.status(400).send({ status: false, msg: "rollNo is mandatory" })
    if (!teacherId) return res.status(400).send({ status: false, msg: "teacherId is mandatory" })
    if (req.body.marks) {
        if (!subject) return res.status(400).send({ status: false, msg: "subject is mandatory" })
        if (!marks) return res.status(400).send({ status: false, msg: "marks is mandatory" })
    }

    const isStudent = await studentModel.findOne({ rollNo : rollNo , teacherId:teacherId })


    if (isStudent) {
        if (isStudent.name != name) return res.status(400).send({ status: false, msg: "rollNo is already Exist" })

        const total = isStudent.marks.length;
        let index = null;
        for (let i = 0; i < total; i++) {
            if (isStudent.marks[i].subject == subject) {
                let x = isStudent.marks[i]
                x.marks += marks
                arr.push(x)
                index = i
            } else {
                console.log(isStudent.marks[i]);
                arr.push(isStudent.marks[i])
            }
        }

        if(index==null) return res.status(400).send({ status: false, msg: "student has been already exist" })
        const updateStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo , teacherId:teacherId  }, { marks: arr }, { new: true })
        return res.status(200).send({ status: true, msg: "data is updated", data: updateStudent })
    }
    console.log(data);
    const createdStudentData = await studentModel.create(data)
    console.log("hiiii");
    return res.status(201).send({ status: true, msg: "Succcesfully Created", data: createdStudentData })
}

const getStudent = async function(req,res){
    let teacherId = req.params.teacherId
    if (!teacherId) return res.status(400).send({ status: false, msg: "teacherId is mandatory" })

    const getStudentdata = await studentModel.find({teacherId:teacherId})
    return res.status(200).send({status:true,msg:"sucsess",data:getStudentdata})
}


const updateStudent = async function (req, res) {
    let data = req.body
    let teacherId = req.params.teacherId
    let name = req.body.name
    let rollNo = req.body.rollNo
    if (req.body.marks) {
        var subject = req.body.marks.subject
        var marks = req.body.marks.marks
    }

    let changeRollNo = req.body.changeRollNo
    let arr = []
    let final = {}

    if (name) {
        final.name = name
    }

    if (!rollNo) return res.status(400).send({ status: false, msg: "rollNo is mandatory" })
    if (req.body.marks) {
        if (!subject) return res.status(400).send({ status: false, msg: "subject is mandatory" })
        if (!marks) return res.status(400).send({ status: false, msg: "marks is mandatory" })
    }

    const isStudent = await studentModel.findOne({ rollNo: rollNo,teacherId:teacherId, isDeleted: false })
    if (!isStudent) return res.status(404).send({ status: false, msg: "Invalid roll number" })

    if (changeRollNo) {
        const isRollNo = await studentModel.findOne({ rollNo: changeRollNo,teacherId:teacherId, isDeleted: false })
        console.log(changeRollNo);
        console.log(isRollNo);
        if (isRollNo) return res.status(400).send({ status: false, msg: "Roll number already alloted" })
        final.rollNo = changeRollNo
    }


    if (isStudent) {

        const total = isStudent.marks.length;
        for (let i = 0; i < total; i++) {
            if (isStudent.marks[i].subject == subject) {
                let x = isStudent.marks[i]
                x.marks = marks
                arr.push(x)
            } else {
                arr.push(isStudent.marks[i])
            }
        }
        final.marks = arr
        console.log(final);

        const updateStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo ,teacherId:teacherId}, final, { new: true })
        return res.status(200).send({ status: true, msg: "data is updated", data: updateStudent })
    }

}

const deleteStudent = async function (req, res) {
    let rollNo = req.body.rollNo
    let teacherId = req.params.teacherId
    if (!rollNo) return res.status(200).send({ status: false, msg: "Roll No is mandatory" })

    let isStudent = await studentModel.findOne({ rollNo: rollNo,teacherId:teacherId, isDeleted: false })
    if (!isStudent) return res.status(404).send({ status: false, msg: "invalid roll number" })

    let deleteStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo,teacherId:teacherId }, { isDeleted: true })
    return res.status(200).send({ status: true, msg: "student data is deleted sucussfully" })
}

module.exports = { createStudent, getStudent,updateStudent, deleteStudent }