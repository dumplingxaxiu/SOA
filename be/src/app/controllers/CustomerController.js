const Customer = require('../models/Customer');
const Role = require('../models/Role');
const bcrypt = require('bcrypt')

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
    //Khi nào sửa db thì tháo comment lệnh save
    async AddNewCustomer(req, res, next) {
        const { fullName, email, userName, password } = req.body;
        if (!fullName || !email || !userName || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const customer = new Customer({
                fullName: fullName, 
                email: email, 
                userName: userName, 
                password: hashedPassword
            })
            //await customer.save();
            console.log(customer)
            const role = new Role({
                userID: customer.userID,
                userName: customer.userName
            })
            //await role.save();
            console.log(role)
            return res.json({ success: true, message: "Add new customer successfully!", data: customer });


        }
        catch (error) {
            return res.json({ success: false, message: "Error in add new!\n" + error.message });
        }
    }

    async UpdateCustomer(req, res, next) {
        const { fullName, phoneNum, email, userName, password } = req.body;
        if (!fullName || !phoneNum || !email || !userName || !password) {
            return res.json({ success: false, message: "Missing infomation!" });
        }
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const customer = await Customer.findOneAndUpdate(
                {userID: req.user.userID}, 
                {fullName: fullName, 
                phoneNum: phoneNum, 
                email: email, 
                userName: userName, 
                password: hashedPassword});

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
          await Customer.findOneAndRemove({userID: id});
          return res.json({ 
            success: true, 
            message: "Customer deleted!",
            user_id: id });
        } catch (error) {
          return res.json({ success: false, message: "Error in delete!" });
        }
      }
}

module.exports = new CustomerController();
