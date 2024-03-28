const bcrypt = require("bcrypt");
const Role = require("./app/models/Role.js");
const Student = require("./app/models/Student.js");
async function createAdminAccount() {
    let admin = await Role.findOne({ role: 0 });
    if (!admin) {
        // Tạo data cho customer model
        const studentData = {
            studentID: "0",
            fullname: "Admin",
            faculty: "None",
            major: "None",
            password: "admin" 
        };
        const passwordHash = bcrypt.hashSync(studentData.password, 10);
        studentData.password = passwordHash;
        const student = new Student(studentData);
        await student.save();

        //Tạo data cho Role
        const roleData = {
            userID: studentData.studentID,
            role: 0
        }
        const role = new Role(roleData)
        await role.save();

        console.log("Admin account was initialized");
    }
}
module.exports = { createAdminAccount };
