const Course = require("../models/productModel");
const Errorhander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const User = require("../models/userModel");


//create

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
    const course = await Course.create(req.body);
    // console.log(req.user.id);
    // const userId = req.user.id;
    // const user = await User.findById(userId);
    // user.organizedQuizzes.push(quiz);
    // await user.save();
   // // await user.populate('organizedQuizzes');
    res.status(201).json({
      success: true,
      course,
      // user
    });
  });

//get all
exports.getAllCourse = catchAsyncErrors(async (req, res) => {

  const resultPerPage = 2;

  const apiFeature = new ApiFeatures(Course.find(),req.query).search().pagination(resultPerPage);

  const course = await apiFeature.query;
  // const product = await Product.find();

  res.status(200).json({
    success: true,
    course,
  });
});


//get single product

exports.getCourseDetails = catchAsyncErrors(async(req,res,next)=>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return next(new Errorhander("course Not Found",404))
    }
    res.status(200).json({
        success:true,
        course
    })
})

