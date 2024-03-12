const Customer = require('../models/Customer');
const Tuition = require('../models/Tuition');

class TuitionController {
    async checkTuition(req,res,next) {
        const studentID = req. //chưa có student id
        try {
            const tuition = await Tuition.findOne({ StudentID: studentID });
            if (tuition) {
                
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async checkState(req,res,next) {
        try {
            const tuition = await Tuition.findOne({ StudentID: studentID });
            if (tuition) {
                return tuition.State;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TuitionController();
