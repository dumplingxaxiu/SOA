const Student = require('../models/Student');

class StudentController {
    async GetAllStudents(req, res, next){
        try {
            const students = await Customer.find();
            return res.json({ success: true, students: students });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in get all!" });
        }
    }
    async getCurrentStudent(req, res, next) {
        const studentID = req.user.studentID
        try {
            const student = await Student.find({studentID:studentID});
            return res.json({ success: true, student: student });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in get current!" });
        }
    }

    async addNewStudent(req, res, next) {
        const { fullName, faculty, major} = req.body;
        if (!fullName || !faculty || !major) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const student = new Student({
                fullName, 
                faculty, 
                major
            })
            await student.save();
            return res.json({ success: true, message: "Add new student successfully!", data: student });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in add new!" });
        }
    }

    async updateStudent(req, res, next) {
        const { fullName, faculty, major} = req.body;
        if (!fullName || !faculty || !major) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const student = await Student.findOneAndUpdate(
                {studentID: req.user.userID}, 
                {fullName, 
                faculty, 
                major});

            return res.json({ 
                 success: true,
                 message: "Update student successfully!",
                 student: student 
                });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in update!" });
        }
    }

    async deleteStudent(req, res, next) {
        const { id } = req.user.userID;
        try {
          if (!id) {
            return res.json({ success: false, message: "Missing id!" });
          }
          await Student.findOneAndRemove({studentID: id});
          return res.json({ 
            success: true, 
            message: "Student deleted!",
            product_id: id });
        } catch (error) {
          return res.json({ success: false, message: "Error in delete!" });
        }
      }
}

module.exports = new StudentController();
