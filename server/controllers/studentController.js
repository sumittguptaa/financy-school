
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorhandle");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// create Product --Admin

exports.createStudent = catchAsyncErrors(async (req,res,next)=>{
    const student = await Student.create(req.body);

    res.status(201).json(
        {
            success:true,
            student,
           message: "Student data inserted successfully"
        }
    )
});


//get All Student

exports.getAllStudentsAssociatewithSchoolId = catchAsyncErrors(async (req,res)=>{
    
    const schoolId = req.params.schoolId;
    const students = await Student.find({school_id:schoolId});
   

    res.status(200).json({
        success:true,
        students,
        message:"Records fetched successfully"
    });
})

exports.getAllStudents = catchAsyncErrors(async (req,res)=>{
    const students = await Student.find();

    res.status(200).json({
        success:true,
        students,
        message: "All records fetched successfully"
    });
})

// Get Product Detail 

exports.getStudentDetails = catchAsyncErrors(async (req,res,next)=>{

    const student = await Student.findById(req.params.id);


    if(!student){
        return next(new ErrorHandler("Product not found",404))
     }

    res.status(200).json({
        success:true,
        student,
        message: "Student fetched successfully"
    })

})

// get student details class wise

exports.getAllStudentsClassWise = catchAsyncErrors(async (req,res)=>{
    
    const schoolId = req.params.schoolId;
    const studentClass = req.params.studentClass;

    const students = await Student.find({school_id:schoolId,class_of_student:studentClass});
   
    res.status(200).json({
        success:true,
        students,
        message: "Student fetched successfully"
    });
})

// update Product --Admin

exports.updateStudent = catchAsyncErrors(async (req,res,next)=>{
    let student = await Student.findById(req.params.id);

    if(!student){
        return next(new ErrorHandler("Student not found",404))
    }

    student = await Student.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        student,
        message: "Updated successfully"
    })
})


// Delete Product



exports.deleteStudent = catchAsyncErrors(async(req,res,next)=>{
    
 
    const student =await Student.findByIdAndDelete(req.params.id);
       
     if(!student){
        return next(new ErrorHandler("Student not found",404))
     }

     
    //  await product.remove();

     res.status(200).json({
        success:true,
        message:"Student Removed Successfully"
     })
     
})
