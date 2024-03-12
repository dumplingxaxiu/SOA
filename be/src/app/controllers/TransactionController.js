const Customer = require("../models/Customer")
const Transaction = require("../models/TransactionHistory")

class TransactionController {
    async getMyTransHistory(req, res, next) {
        const customerID = req.user.id //chua biet thong tin login
        try {
            const transactions = await Transaction.find({ customerID })
            res.json({
                success: true,
                message: "Get Transaction History succeeded!",
                transactions: transactions
            });
        } catch (error) {
            console.error("Error:", error);
            res.json({
                success: false,
                message: "Get Transaction History failed!"
            })
        }
    }
    async getTransactionBySlug(req, res, next){
        const { slug } = req.params
        try {
            const transaction = await Transaction.findOne({ slug: slug });
            return res.json({ 
                success: true,
                message: "Get transaction by slug succeeded!", 
                transaction: transaction });
          } catch (error) {
            return res.json({ success: false, message: "Get transaction by slug failed!!" });
          }
    }
    async addNewTransaction(req, res, next){
        const senderName = req.body.sender.name //chua co input
        const senderID = sender.id // chua co input
        const receiverName = req.body.receiver.name //chua co input
        const receiverID = req.body.receiver.id // chua co input
        const amount = req.body.amount // chua co input
        const type = req.body.type //chua co input
        const content = req.body.content //chua co input
        if(!sender || !receiver || !amount){
            res.json({
                success: false,
                message: "Missing information"
            })
        }
        try {
           const transaction = new Transaction({
            senderID,
            senderName,
            receiverID,
            receiverName,
            amount,
            content,
            type,
           })
           await transaction.save()
           return res.json({
            success: true,
            message: "Create new transaction succeeded!",
            transaction: transaction
           })
        } catch (error) {
            return res.json({success: false, message:"Create transaction failed!"})
        }
    }
    //lam ham delete, update o day de bi conflict voi balance cua banking account
    async deleteTransaction(req,res,next){
        const customerID = req.user.id
        const transactionID =req. //chua có transactionID
        try {
            const transaction = await Transaction.findById(transactionID);
            if (!transaction) {
                return res.json({ success: false, message: "Khong tìm thấy transaction id" });
            }
            await transaction.remove();
            return res.json({ success: true, message: "Xóa transaction thành công" });
        } catch (error) {
            console.error("Error:", error);
            return res.json({ success: false, message: "Không xóa được transaction" });
        }
    }
}
module.exports = new TransactionController()
