const Customer = require('../models/Customer');

class CustomerController {
    async index(req, res, next){
        res.json("Customer API")
    }
    async getCustomer(req, res, next) {
        const customerID = customer.customerID
        try {
            const customers = await Customer.find();
            return res.json({ success: true, customers: customers });
        }
        catch (error) {
            return res.json({ success: false, message: "Error!" });
        }
    }
    async getCustomerBySlug(req, res, next){
        const { slug } = req.params
        try {
            const customer = await Customer.findOne({ slug: slug });
            return res.json({ success: true, customer: customer });
          } catch (error) {
            return res.json({ success: false, message: "Error!" });
          }
    }
    async addNewCustomer(req, res, next) {
        const { fullName, phoneNum, email, username, password } = req.body;
        if (!fullName || !phoneNum || !email || !username || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const customer = new Customer({
                fullName,
                phoneNum, 
                email, 
                username, 
                password
            })
            await customer.save();
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
            const customer = await Customer.findByIdAndUpdate(
                customerID, 
                {fullName, 
                    phoneNum, 
                    email, 
                    username, 
                    password});

            return res.json({ 
                 success: true,
                 message: "Update customer successfully!",
                 customer: customer 
                });
        }
        catch (error) {
            return res.json({ success: false, message: "Error!" });
        }
    }

    async deleteCustomer(req, res, next) {
        const { id } = req.body;
        try {
          if (!id) {
            return res.json({ success: false, message: "Missing id!" });
          }
          await Customer.findByIdAndRemove(id);
          return res.json({ 
            success: true, 
            message: "Product deleted",
            product_id: id });
        } catch (error) {
          return res.json({ success: false, message: "Error!" });
        }
      }
}

module.exports = new CustomerController();
