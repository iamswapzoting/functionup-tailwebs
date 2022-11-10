const { Router } = require("express")
const express = require("express")
const router = express.Router()
const studentController = require("../controller/studentController")


router.post("/createstudent",studentController.createStudent)

router.put("/updatestudent",studentController.updateStudent)

router.delete("/deletestudent",studentController.deleteStudent)



module.exports = router