const express = require('express');
const { getAllStudents, createStudent, updateStudent, deleteStudent, getStudentDetails } = require('../controllers/studentController');

const router = express.Router();


router.route("/students").get(getAllStudents);
router.route("/student/new").post(createStudent);
router.route("/student/:id").put(updateStudent).delete(deleteStudent).get(getStudentDetails);





module.exports = router
