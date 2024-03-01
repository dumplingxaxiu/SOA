const Student = require("./models/Student"); 
const Tuition = require("./models/Tuition");

// Function to check tuition for a student and send JSON response
async function checkTuition(studentID, res) {
    try {
        const student = await Student.findById(studentID);

        if (!student) {
            return res.status(404).json({ error: "Không tìm thấy học phí tương ứng với MSSV" });
        }

        const tuitionRecords = await Tuition.find({ StudentID: studentID });

        const tuitionData = tuitionRecords.map(tuition => {
            return {
                tuitionID: tuition.tuitionID,
                amount: tuition.Tuition,
                semester: tuition.Semester,
                state: tuition.State
            };
        });

        res.json(tuitionData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Lỗi" });
    }
}
