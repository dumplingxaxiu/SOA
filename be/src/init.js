const bcrypt = require("bcrypt");
const Account = require("./app/models/Account.js");
async function createAdminAccount() {
    let acc = await Account.findOne({ role: "admin" });
    if (!acc) {
        const data = {
            username: "admin",
            role: "admin",
            password: "admin",
        };
        const passwordHash = bcrypt.hashSync(data.password, 10);
        data.password = passwordHash;
        const account = new Account(data);
        await account.save();
        console.log("Admin account was initialized");
    }
}
module.exports = { createAdminAccount };
