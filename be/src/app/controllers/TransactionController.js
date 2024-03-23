const { json } = require("express");
const Customer = require("../models/Customer")
const Transaction = require("../models/Transaction")

class TransactionController {
    async getMyTransactionHistory(req, res, next) {
        const user = req.user.data
        try {
            const transactions = await Transaction.find({$or:[{senderID: user.bankAccountNumber},{receiverID: user.bankAccountNumber}], TransactionState: 1})
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
        const sender = req.user
        const receiverData = req.body.receiver
        const context = req.body.context
        if(!(sender || receiverData || context)){
            return res.json({success: false, message: "Missing information!"})
        }

        const receiver = await Customer.find({bankAccountNumber: receiverData.receiverID})
        const isValidReceiver = (receiver, receiverData) => {
            return (receiver && receiver.fullName == receiverData.receiverName)
        }

        if(!isValidReceiver){
            return res.json({success: false, message: "Invalid Receiver!"})
        }

        if(sender.balance < context.transactionAmount){
            return res.json({success: false, message: "Not enough balance to make transaction!"})
        }

        try {
           const transaction = new Transaction({
            SenderID: sender.bankAccountNumber,
            SenderName: sender.fullName,
            ReceiverID: receiver.bankAccountNumber,
            ReceiverName: receiver.fullName,
            TransactionAmount: context.transactionAmount,
            TransactionContent: context.transactionDetail,
            TransactionType: context.transactionType,
           })
           const isSucceeded = async  (transaction) => {
                let sender = await Customer.find({bankAccountNumber: transaction.SenderID})
                let receiver = await Customer.find({bankAccountNumber: transaction.ReceiverID})
    
                if(sender.balance >= transaction.amount){
                    sender.balance -= transaction.amount
                    receiver.balance += transaction.amount
                    transaction.TransactionState = 1
                    //await sender.save()
                    //await receiver.save()
                    //await transaction.save()
                    return {
                        success: true,
                        transaction: transaction
                    }
                }else{
                    transaction.TransactionState = -1
                    //await transaction.save
                    return {
                        success: false,
                        transaction: transaction
                    }
                }
           }
           const transactionProcessData = await isSucceeded(transaction)
           if(transactionProcessData.success){
               return res.json({
                   success: true,
                   message: "Create new transaction succeeded!",
                   transaction: transactionProcessData.transaction
               })
           }else{
            return res.json({
                success: false,
                message: "Transaction failed!",
                transaction: transactionProcessData.transaction
            })
           }
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
