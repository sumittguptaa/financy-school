const express = require('express');
const { userRegister, userLogin, logout }=require("../controllers/userSchoolController");

const router = express.Router();

router.route("/register").post(userRegister);

router.route("/login").post(userLogin);
router.route("/logout").get(logout);

module.exports = router;