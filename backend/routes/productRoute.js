const express = require("express");
const { getAllCourse,createCourse, getCourseDetails } = require("../controllers/productController");


const router = express.Router();



router.route("/course").get(getAllCourse);
router.route("/course/new").post(createCourse);
router.route("/course/:id").get(getCourseDetails);



module.exports = router