const bcrypt = require("bcrypt")

const Role = require('../models/Role');
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

            const role = new Role({
                studentID: student.studentID
            
            })
            await role.save()
            return res.json({ success: true, message: "Add new student successfully!", data: student });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in add new!" });
        }
    }

    async updateStudent(req, res, next) {
        const {studentID, fullname, faculty, major, password} = req.body
        try {
            const student = await Student.findOne(
                {studentID: studentID}
            )
            const { fullname, faculty, major, password} = req.body;
            if(fullname){
                student.fullname = fullname
            }
            if(faculty){
                student.faculty = faculty
            }
            if(major){
                student.major = major
            }
            if(password){
                const passwordHash = bcrypt.hashSync(studentData.password, 10);
                student.password = passwordHash
            }
            student.save()
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
        const id = req.body.studentID;
        try {
          if (!id) {
            return res.json({ success: false, message: "Missing id!" });
          }
          await Student.findOneAndRemove({studentID: id});
          await Role.findOneAndRemove({studentID: id});
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
