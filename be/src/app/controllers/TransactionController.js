const Customer = require("../models/Customer")
const Transaction = require("../models/TransactionHistory")

class TransactionController {
    async getMyTransactionHistory(req, res, next) {
        const user = req.user.data
        try {
            const transactions = await Transaction.find({$or:[{senderID: user.bankAccountNumber},{receiverID: user.bankAccountNumber}]})
            res.json({
                success: true,
                message: "Get Transaction History succeeded!",
                transactions: transactions
            });
        } catch (error) {
            console.error("Error:", error);
            res.json({
                success: false,
                message: "Get Transaction History failed!" + error.message
            })
        }
    }

    async AddNewTransaction(req, res, next){
        if(!(req.sender || req.receiver || req.context)){
            return res.json({success: false, message: "Missing information!"})
        }
        const sender = await Customer.find({bankAccountNumber: req.sender.senderID})
        if(sender && sender.fullName == req.SenderName){
            const isValidSender = 1    
        }else{const isValidSender = 0}

        const receiver = await Customer.find({bankAccountNumber: req.receiver.receiverID})
        if(receiver && receiver.fullName == req.receiverName){
            const isValidReceiver = 1    
        }else{const isValidReceiver = 0}

        if(!(isValidSender || isValidSender)){
            return res.json({success: false, message: "Invalid Sender or Receiver!"})
        }

        if(sender.balance < req.context.amount){
            return res.json({success: false, message: "Not enough balance to make transaction!"})
        }

        try {
           const transaction = new Transaction({
            SenderID: sender.bankAccountNumber,
            SenderName: sender.fullName,
            ReceiverID: receiver.bankAccountNumber,
            ReceiverName: receiver.fullName,
            TransactionAmount: detail.amount,
            TransactionContent: detail.content,
            TransactionType: detail.type,
           })
           //await transaction.save()
           return res.json({
            success: true,
            message: "Create new transaction succeeded!",
            transaction: transaction
           })
        } catch (error) {
            return res.json({success: false, message:"Create transaction failed!" + error.message})
        }
    }
    //lam ham delete, update o day de bi conflict voi balance cua banking account
    async deleteTransaction(req,res,next){
        const transactionID = req.body.id //chua có transactionID
        try {
            const transaction = await Transaction.find({TransactionID:transactionID})
            if (!transaction) {
                return res.json({ success: false, message: "Khong tìm thấy transaction id" });
            }
            await transaction.remove();
            return res.json({ success: true, message: "Xóa transaction thành công" });
        } catch (error) {
           
            return res.json({ success: false, message: "Không xóa được transaction" + error.message});
        }
    }
}
module.exports = new TransactionController()
