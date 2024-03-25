const { json } = require("express");
const Customer = require("../models/Customer")
const Transaction = require("../models/Transaction");
const { OTPSigned, OTPVerify } = require("../utils/otpUtils");

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
        const sender = req.user.data
        const receiverData = req.body.receiver
        const context = req.body.context

        if(!(sender || receiverData || context)){
            return res.json({success: false, message: "Missing information!"})
        }

        const receiver = await Customer.findOne({bankAccountNumber: receiverData.receiverID})

        const isValidReceiver = (receiver, receiverData) => {
            return (receiver && receiver.fullName == receiverData.receiverName)
        }

        if(!isValidReceiver){
            return res.json({success: false, message: "Invalid Receiver!"})
        }

        if(sender.balance < context.transactionAmount || context.transactionAmount == 0){
            return res.json({success: false, message: "Not enough balance to make transaction!"})
        }

        try {
            const transaction = new Transaction({
            SenderID: sender.bankAccountNumber,
            SenderName: sender.fullName,
            ReceiverID: receiver.bankAccountNumber,
            ReceiverName: receiver.fullName,
            TransactionAmount: context.transactionAmount,
            TransactionDetail: context.transactionDetail,
            TransactionType: context.transactionType,
           })
           await transaction.save()
           const otpSigned = await OTPSigned()
            req.session.signedOTP = {transactionID: transaction.TransactionID,otp: otpSigned}
            console.log(req.session.signedOTP)
            if(!req.session.signedOTP){
                return res.json({
                    success:false,
                    message: "Cannot signed OTP"
                })
            }
            
            return res.json({
                success: true,
                message: "Create new transaction succeeded!",
                transaction: transaction
            })
        } catch (error) {
            return res.json({success: false, message:"Create transaction failed!" + error.message})
        }
    }
    async verifyTransaction(req, res, next){
        console.log(req.body)
        const submittedOTP = req.body.submittedOTP
        console.log(submittedOTP)
        if(!submittedOTP){
            return res.json({
                success: false,
                message: "Missing OTP"
            })
        }
        const transaction = await Transaction.findOne({TransactionID: req.session.signedOTP.transactionID})
        if(!transaction){
            return res.json({
                success: false,
                message: "Cannot find transaction ID: " + req.session.signedOTP.transactionID
            })
        }
        const verifyData = await OTPVerify(req.session.signedOTP,submittedOTP)
        console.log(verifyData)
        if(!verifyData.success == true){
            return res.json(
                verifyData
            )
        }else{
            const sender = await Customer.findOne({bankAccountNumber: transaction.SenderID})
            console.log(sender)
            if(!sender){
                return res.json({
                    success: false,
                    message: "Cannot find sender"
                })
            }
            const receiver = await Customer.findOne({bankAccountNumber: transaction.ReceiverID})
            if(!receiver){
                return res.json({
                    success: false,
                    message: "Cannot find receiver"
                })
            }

            if(sender.balance < transaction.TransactionAmount){
                return res.json({
                    success: false,
                    message: "Not enough Balance"
                })
            }
            try{
                sender.balance -= transaction.TransactionAmount
                await sender.save()
                receiver.balance += transaction.TransactionAmount
                await receiver.save()
                transaction.TransactionState = 1
                await transaction.save()

                return res.json({
                    success: true,
                    message: "Transaction proceeded successfully!",
                    transaction: transaction
                })
            }catch(error){
                return res.json({success: false, message:"Verify transaction failed!" + error.message})
            }

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
