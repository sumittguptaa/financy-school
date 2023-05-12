const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
  accessKeyId: "AKIAZAYC62OFKDSTU77V",
  secretAccessKey: "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",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorhandle");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// create Product --Admin

exports.createStudent = catchAsyncErrors(async (req, res, next) => {
  const params = {
    TableName: "userschools",
    Item: {
      id: req.body.school_id,
      ...req.body,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({
      success: true,
      message: "Student data inserted successfully",
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Error creating student", 500));
  }
});

//get All Student


exports.getAllStudentsAssociatewithSchoolId = catchAsyncErrors(
  async (req, res) => {
    const schoolId = req.params.schoolId;
    const params = {
      TableName: "userschools",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id":  schoolId ,
      },
    };
    try {
      const data = await dynamoDB.query(params).promise();
      res.status(200).json({
        success: true,
        students: data.Items,
        message: "Records fetched successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch records",
      });
    }
  }
);

exports.getAllStudents = catchAsyncErrors(async (req, res) => {
  const params = {
    TableName: "userschools",
  };
   try {
     const data = await dynamoDB.scan(params).promise();
     res.status(200).json({
       success: true,
       students: data.Items,
       message: "Records fetched successfully",
     });
   } catch (err) {
     console.error(err);
     res.status(500).json({
       success: false,
       message: "Unable to fetch records",
     });
   }
});

// Get Product Detail

exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    student,
    message: "Student fetched successfully",
  });
});

// get student details class wise

exports.getAllStudentsClassWise = catchAsyncErrors(async (req, res) => {
  const schoolId = req.params.schoolId;
  const studentClass = req.params.studentClass;

  const params = {
    TableName: "userschools",
    IndexName: "school_id_index",
    KeyConditionExpression:
      "#school_id = :schoolId and #class_of_student = :studentClass",
    ExpressionAttributeNames: {
      "#school_id": "school_id",
      "#class_of_student": "class_of_student",
    },
    ExpressionAttributeValues: {
      ":schoolId": schoolId,
      ":studentClass": studentClass,
    },
  };

  dynamoDB.query(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      return next(new ErrorHandler("Error retrieving data", 500));
    } else {
      res.status(200).json({
        success: true,
        students: data.Items,
        message: "Student fetched successfully",
      });
    }
  });
});

// update Product --Admin

exports.updateStudent = catchAsyncErrors(async (req, res, next) => {
  let student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    student,
    message: "Updated successfully",
  });
});

// Delete Product

exports.deleteStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  //  await product.remove();

  res.status(200).json({
    success: true,
    message: "Student Removed Successfully",
  });
});
