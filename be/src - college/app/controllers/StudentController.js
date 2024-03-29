const Student = require('../models/Student');

class StudentController {
    async GetAllStudents(req, res, next){
        try {
            const students = await Student.find();
            return res.json({ success: true, students: students });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in get all!" });
        }
    }
    async addNewStudent(req, res, next) {
        const { fullname, faculty, major, password} = req.body;
        if (!fullname || !faculty || !major || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const student = new Student({
                fullname: fullname, 
                faculty: faculty, 
                major: major,
                password: password
            })
            await student.save();
            return res.json({ success: true, message: "Add new student successfully!", data: student });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in add new!" });
        }
    }

    async updateStudent(req, res, next) {
        const { fullname, faculty, major, password} = req.body;
        if (!fullname || !faculty || !major || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const student = await Student.findOneAndUpdate(
                {studentID: req.user.studentID}, 
                {fullname: fullname, 
                faculty: faculty, 
                major: major,
                password: password
            });

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
