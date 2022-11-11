const teacherModel = require("../models/teacherModel")
const jwt = require("jsonwebtoken")

const createTeacher = async function (req, res) {
  try {
    let data = req.body;
    let { fname, lname, emailId, password } = req.body

    if (!fname) return res.status(400).send({ status: false, msg: "firstName is Mandatory" })
    if (!lname) return res.status(400).send({ status: false, msg: "lastName is Mandatory" })
    if (!emailId) return res.status(400).send({ status: false, msg: "emailId is Mandatory" })
    if (!password) return res.status(400).send({ status: false, msg: "password is Mandatory" })
    let savedData = await teacherModel.create(data);
    return res.status(201).send({ msg: savedData })
  }
  catch (error) {
    console.log("This is the error :", error.message)
    return res.status(500).send({ msg: "Error", error: error.message })
  }
};


const login = async function (req, res) {
  const emailId = req.body.emailId;
  const password = req.body.password;

  if (!emailId) return res.status(400).send({ status: false, msg: "email is required" })
  if (!password) return res.status(400).send({ status: false, msg: "password is required" })

  const teacherData = await teacherModel.findOne({ emailId: emailId, password: password, isdeleted: false })
  if (!teacherData) return res.status(404).send({ status: false, msg: "email Or Password is wrong" })

  let token = jwt.sign({
    teacherId: teacherData._id
  },
    "tailwebs-2022")

  res.setHeader("x-api-key", token);
  return res.status(201).send({ status: true, token: token ,teacherId:teacherData._id})
}

module.exports = { createTeacher ,login }