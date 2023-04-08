const express = require('express');
const { getAllStudents,getAllStudentsClassWise, createStudent, updateStudent, deleteStudent, getStudentDetails, getAllStudentsAssociatewithSchoolId } = require('../controllers/studentController');
const router = express.Router();
router.route("/students").get(getAllStudents);
router.route("/students/:schoolId").get(getAllStudentsAssociatewithSchoolId);
router.route("/students/:schoolId/:studentClass").get(getAllStudentsClassWise);
router.route("/student/new").post(createStudent);
router.route("/student/:id").put(updateStudent).delete(deleteStudent).get(getStudentDetails);
module.exports = router
