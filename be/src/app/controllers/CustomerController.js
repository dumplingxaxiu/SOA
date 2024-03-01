const Customer = require('../models/Customer');

class CustomerController {
    async getCustomer(req, res, next) {
        const customer = req.customer
        const customerID = customer.customerID
        try {
            const result = await Customer.find({ customerID });
            return res.json({ success: true, result });
        }
        catch (error) {
            return res.json({ success: false, message: "Error!" });
        }
    }

    async addNewCustomer(req, res, next) {
        const { fullName, phoneNum, email, username, password } = req.body;
        if (!fullName || !phoneNum || !email || !username || !passwor) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const data = new Customer({
                fullName, phoneNum, email, username, password
            })
            await data.save();
            return res.json({ success: true, message: "Add new customer successfully!", data });
        }
        catch (error) {
            return res.json({ success: false, message: "Error!" });
        }
    }

    async updateCustomer(req, res, next) {
        const { fullName, phoneNum, email, username, password } = req.body;
        if (!fullName || !phoneNum || !email || !username || !passwor) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            await Customer.updateOne({customerID}, {fullName, phoneNum, email, username, password});
            return res.json({ success: true, message: "Update customer successfully!" });
        }
        catch (error) {
            return res.json({ success: false, message: "Error!" });
        }
    }
}

module.exports = new CartController();
