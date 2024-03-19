const Customer = require('../models/Customer');

class CustomerController {
    async GetAllCustomers(req, res, next){
        try {
            const customers = await Customer.find();
            return res.json({ success: true, customers: customers });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in get all!" });
        }
    }
    async getCurrentCustomer(req, res, next) {
        const customerID = req.user.customerID
        try {
            const customers = await Customer.find({userID:customerID});
            return res.json({ success: true, customer: customer });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in get current!" });
        }
    }

    async AddNewCustomer(req, res, next) {
        const { fullName, email, userName, password } = req.body;
        if (!fullName || !email || !userName || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const customer = new Customer({
                fullName: fullName, 
                email: email, 
                userName: userName, 
                password: password
            })
            await customer.save();
            return res.json({ success: true, message: "Add new customer successfully!", data: customer });


        }
        catch (error) {
            return res.json({ success: false, message: "Error in add new!" });
        }
    }

    async UpdateCustomer(req, res, next) {
        const { fullName, phoneNum, email, userName, password } = req.body;
        if (!fullName || !phoneNum || !email || !userName || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const customer = await Customer.findOneAndUpdate(
                {customerID: req.user.userID}, 
                {fullName: fullName, 
                phoneNum: phoneNum, 
                email: email, 
                userName: userName, 
                password: password});

            return res.json({ 
                 success: true,
                 message: "Update customer successfully!",
                 customer: customer 
                });
        }
        catch (error) {
            return res.json({ success: false, message: "Error in update!" });
        }
    }

    async DeleteCustomer(req, res, next) {
        const { id } = req.user.userID;
        try {
          if (!id) {
            return res.json({ success: false, message: "Missing id!" });
          }
          await Customer.findOneAndRemove({customerID: id});
          return res.json({ 
            success: true, 
            message: "Customer deleted!",
            product_id: id });
        } catch (error) {
          return res.json({ success: false, message: "Error in delete!" });
        }
      }
}

module.exports = new CustomerController();
