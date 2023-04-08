const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    school_id:{
        type:String,
        required:[true,"Please Enter School Id"],
        trim:true
    },
    class_of_student:{
        type:String,
        required:[true,"Please Enter School Id"],
        trim:true
    },
    gi_student:
        {
            studentname_as_per_school_record:{
                type:String,
                required:[true,"Please Enter Student name as per school record"],
                trim:true
            },
            student_id_as_per_state:{
                type:String,
                required:[true,"Please Enter Student Id as per state"],
                trim:true
            },
            student_gender:{
                type:String,
                required:[true,"Please select student your gender"],
                trim:true
            },
            student_dob:{
                type:String,
                required:[true,"Please Enter dob of Student  "],
                trim:true
            },
            studentname_mother_name:{
                type:String,
                required:[true,"Please Enter Student mother name "],
                trim:true
            },
            studentname_father_name:{
                type:String,
                required:[true,"Please Enter Student father name "],
                trim:true
            },
            aadhar_noof_student:{
                    type:String,
                    required:[true,"Please Enter Student Aadhar no "],
                    trim:true
                
            },
            student_name_asper_aadhar:{
                type:String,
                required:[true,"Please Enter Student name (as per aadhar) "],
                trim:true
            }


        }
    ,

    student_enrollment_detail:
        {
            admission_no_in_school:{
                type:String,
                required:[true,"Please Enter Student admission no in school "],
                trim:true
            },
            admission_date_in_present_class:{
                type:String,
                required:[true,"Please Enter Admission date in present class "],
                trim:true
            },
            class_rollno:{
                type:String,
                required:[true,"Please Enter class roll no "],
                trim:true
            },
            academic_stream_opted_by_student:{
                type:String,
                required:[true,"Please Enter Stream opted "],
                trim:true
            },
            status_of_student_in_previous_academic_schooling:{
                type:String,
                required:[true,"Please Enter status of student in previous year "],
                trim:true
            },
            class_in_previous_year:{
                type:String,
                required:[true,"Please Enter  class/grade in previous year? "],
                trim:true
            },
            percentage_marks_of_student_in_previous_academic_schooling:{
                type:String,
                required:[true,"Please Enter  last school marks? "],
                trim:true
            },
            percentage_attendance_of_student_in_previous_academic_schooling:{
                type:String,
                required:[true,"Please Enter  last year attendance? "],
                trim:true
            }

        }
    ,
    facility_detail_of_student:
        {
            previous_year_scholarship_receive:{
                type:String,
                required:[true,"Please select scholarship received previous year? "],
                trim:true
            },
            student_sld:{
                type:String,
                required:[true,"Student screened for specific learning  disability? "],
                trim:true
            },
            student_asd:{
                type:String,
                required:[true,"Student screened for Autism Spectrum disorder? "],
                trim:true
            },
            student_adhd:{
                type:String,
                required:[true,"Student screened for attention deficient hyperactive disorder? "],
                trim:true
            },
            involved_in_etracurricular_activity:{
                type:String,
                required:[true,"select wheather involve in extracurricular or not? "],
                trim:true
            }
        }
    ,
   
   


createdAt:{
    type:Date,
    default:Date.now
}
})

module.exports = mongoose.model("Student",studentSchema);
