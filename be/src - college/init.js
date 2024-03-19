const bcrypt = require("bcrypt");
const Role = require("./app/models/Role.js");
const Customer = require("./app/models/Customer.js");
async function createAdminAccount() {
    let admin = await Role.findOne({ role: "admin" });
    if (!admin) {
        // Tạo data cho customer model
        const customerData = {
            userID: "0",
            citizenID: "0",
            fullName: "Admin",
            bankAccountNumber: "0",
            phoneNumber: "0",
            email: "admin@adminmail.com",
            userName: "admin" 
        };
        const passwordHash = bcrypt.hashSync(customerData.password, 10);
        customerData.password = passwordHash;
        const customer = new Customer(customerData);
        await customer.save();

        //Tạo data cho Role
        const roleData = {
            userID: customerData.userID,
            userName: customerData.userName,
            role: 0
        }
        const role = new Role(roleData)
        await role.save();

        console.log("Admin account was initialized");
    }
}
module.exports = { createAdminAccount };
