const { model } = require("mongoose")
const studentModel = require("../models/studentModel")



const createStudent = async function (req, res) {

    let data = req.body

    let name = req.body.name
    let rollNo = req.body.rollNo
    let subject = req.body.marks.subject
    let marks = req.body.marks.marks
    let arr = []

    if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })
    if (!rollNo) return res.status(400).send({ status: false, msg: "rollNo is mandatory" })
    if (req.body.marks) {
        if (!subject) return res.status(400).send({ status: false, msg: "subject is mandatory" })
        if (!marks) return res.status(400).send({ status: false, msg: "marks is mandatory" })
    }

    const isStudent = await studentModel.findOne({ rollNo })


    if (isStudent) {
        if (isStudent.name != name) return res.status(400).send({ status: false, msg: "rollNo is already Exist" })

        const total = isStudent.marks.length;
        for (let i = 0; i < total; i++) {
            if (isStudent.marks[i].subject == subject) {
                let x = isStudent.marks[i]
                x.marks += marks
                arr.push(x)
            } else {
                console.log(isStudent.marks[i]);
                arr.push(isStudent.marks[i])
            }
        }

        const updateStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo }, { marks: arr }, { new: true })
        return res.status(200).send({ status: true, msg: "data is updated", data: updateStudent })
    }

    const createdStudentData = await studentModel.create(data)
    return res.status(201).send({ status: true, msg: "Succcesfully Created", data: createdStudentData })
}


const updateStudent = async function (req, res) {
    let data = req.body

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

    const isStudent = await studentModel.findOne({ rollNo: rollNo ,isdeleted:false})
    if (!isStudent) return res.status(404).send({ status: false, msg: "Invalid roll number" })

    if (changeRollNo) {
        const isRollNo = await studentModel.findOne({ rollNo: changeRollNo ,isdeleted:false})
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

        const updateStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo }, final, { new: true })
        return res.status(200).send({ status: true, msg: "data is updated", data: updateStudent })
    }

}

const deleteStudent = async function (req, res) {
    let rollNo = req.body.rollNo
    if (!rollNo) return res.status(200).send({ status: false, msg: "Roll No is mandatory" })

    let isStudent = await studentModel.findOne({ rollNo: rollNo, isdeleted: false })
    if (!isStudent) return res.status(404).send({ status: false, msg: "invalid roll number" })

    let deleteStudent = await studentModel.findOneAndUpdate({ rollNo: rollNo }, { isdeleted: true })
    return res.status(200).send({ status: true, msg: "student data is deleted sucussfully" })
}

module.exports = { createStudent, updateStudent ,deleteStudent}