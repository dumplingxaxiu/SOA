const Customer = require('../models/Student');
const Tuition = require('../models/Tuition');

class TuitionController {
    async getMyTuition(req,res,next) {
        const studentID = req.user.data.studentID
        try {
            const tuitions = await Tuition.find({ studentID: studentID });
            if (tuitions) {
                // Trả về dữ liệu tuition
                return res.json({
                    success: true,
                    tuition: tuitions
                });
            }
        } catch (error) {
            return res.json({
                success: false,
                message:"Error in get tuitions!" + error.message
            });
        }
    }

    async addNewTuition(req,res,next) {
        const {studentID, semester, tuition } = req.body
        if(!(studentID || semester || tuition)){
            return res.json({
                success: false,
                message: "Missing infomation in add tuition!"
            })
        }
        try {
            const tuitionData = new Tuition({
                studentID: studentID,
                tuition: tuition,
                semester: semester
            })
            await tuitionData.save()
            return res.json({
                success: true,
                message: "Add tuition succeeded!",
                tuition: tuitionData
            });
        } catch (error) {
            return res.json({
                success: false,
                message:"Error in add tuitions!" + error.message
            });
        }
    }

    async updateTuition(req,res,next) {
        const {tuitionID, studentID, semester} = req.body
        if(!tuitionID){
            return res.json({
                success: false,
                message: "Missing tuition ID in update tuition!"
            })
        }
        try {
            const tuition = await Tuition.findOne({tuitionID: tuitionID})

            if(studentID){
                tuition.studentID = studentID
            }
            if(semester){
                tuition.semester = semester
            }

            const isVerify = {success: false} //await onConfirmPayment();

            if(isVerify.success == true){
                tuition.tuition = 0
                tuition.state = "Paid"
            }

            await tuition.save()

            return res.json({
                success: true,
                message: "Update tuition succeeded!",
                tuition: tuition
            });
        } catch (error) {
            return res.json({
                success: false,
                message:"Error in update tuition!" + error.message
            });
        }
    }
}

module.exports = new TuitionController();
