const { Router } = require("express")
const express = require("express")
const router = express.Router()
const studentController = require("../controller/studentController")
const teacherController = require("../controller/teacherController")
const auth = require("../middleware/auth")




router.post("/teacher",teacherController.createTeacher)

router.post("/login",teacherController.login)



router.post("/student/teacherId/:teacherId",auth.Authentication ,auth.Authorisation,studentController.createStudent)

router.get("/student/teacherId/:teacherId",auth.Authentication ,auth.Authorisation,studentController.getStudent)

router.put("/student/teacherId/:teacherId",auth.Authentication ,auth.Authorisation,studentController.updateStudent)

router.delete("/student/teacherId/:teacherId",auth.Authentication ,auth.Authorisation,studentController.deleteStudent)



module.exports = router