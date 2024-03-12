const Customer = require('../models/Customer');
const Tuition = require('../models/Tuition');

class TuitionController {
    async checkTuition(req,res,next) {
        const studentID = req. //chưa có student id
        try {
            const tuition = await Tuition.findOne({ StudentID: studentID });
            if (tuition) {
                // Trả về dữ liệu tuition
                return res.json({
                    studentID: tuition.studentID,
                    tuition: tuition.tuition,
                    status: tuition.status,
                });
            } else {
                return res.json({ message: 'Không tìm thấy học phí cho học viên này.' });
            }
        } catch (error) {
            return next(error);
        }
}
class BankAccount
module.exports = new TuitionController();
