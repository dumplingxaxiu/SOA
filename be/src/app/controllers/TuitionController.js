const Customer = require('../models/Customer');
const Tuition = require('../models/Tuition');

class TuitionController {
    async checkTuition(studentID) {
        try {
            const tuition = await Tuition.findOne({ StudentID: studentID });
            if (tuition) {
                return tuition.Tuition;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async checkState(studentID) {
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

    async writeToJSON(data) {
        try {
            fs.writeFileSync('tuitionInfo.json', JSON.stringify(data), 'utf8');
            //console.log('Đã ghi file json');
        } catch (error) {
            throw error;
        }
    }

    async checkAndWriteToJSON(studentID) {
        try {
            const tuitionStatus = await this.checkTuition(studentID);
            const stateStatus = await this.checkState(studentID);
            const data = { tuitionStatus, stateStatus };
            await this.writeToJSON(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TuitionController();
