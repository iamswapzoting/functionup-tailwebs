
const jwt = require("jsonwebtoken");
const teacherModel = require("../models/teacherModel");

//================================Authentication Middleware===========================
//                                  (API - 2,3,4,5 & 6)


const Authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) { return res.status(401).send({ status: false, message: "Missing authentication token in required" }); }
        const decodedToken = jwt.verify(token, "tailwebs-2022")
        console.log(decodedToken)
        if (!decodedToken) return res.status(403).send({ status: false, message: "Invalid authentication token" });
        req.teacherLogIn = decodedToken.AuthorId
        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



//================================Authorisation Middleware============================
//                                  (API - 2,3,4,5 & 6)


const Authorisation = async (req, res, next) => {
    try {
        let teacherLogIn = req.teacherLogIn
        let teacherId = req.params.teacherId

        if (!teacherId) return res.status(400).send({ status: false, message: "techerId is not present" });
        if (teacherId != teacherLogIn) return res.status(403).send({ status: false, msg: "teacherId logged is not allowed to modify the requested or You have given invalid 'teacherId'" })
        next()
    } catch (error) {
        console.log("This is the error :", error.message)
        return res.status(500).send({ msg: "Error", error: error.message })
    }

}


module.exports.Authentication = Authentication
module.exports.Authorisation = Authorisation