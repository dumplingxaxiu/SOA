const { json } = require("express");
const session = require("express-session")
const today = new Date();
var DD = today.getDate()
var MM = today.getMonth() + 1
var YYYY = today.getFullYear();
var hh = today.getHours()
var mm = today.getMinutes()
var ss = today.getSeconds()

const OTPGenerator = () =>{
    return Math.floor(100000 + Math.random () * 900000).toString()
}

const OTPSigned = async () =>{
    const otp = OTPGenerator();
    expiredAt = new Date(YYYY,MM,DD,hh,mm + 3,ss)
    console.log(expiredAt)
    return {
        otp: otp,
        //createAt: createAt,
        expiredAt: expiredAt
    }
}

const OTPVerify = async (key,otp) => {
    if(!key){
        return {
            success:false,
            message: "Cannot get session"
        }
    }
    if(!key.transactionID){
        return {success: false,
                message: "transaction otp verify failed by id"}
    }
    const verifyTime = new Date()
    if(verifyTime <= key.otp.expiredAt){
        return {success: false,
            message: "transaction otp verify failed by expiration"}
    }
    if(otp != key.otp.otp){
        return {success: false,
            message: "transaction otp verify failed by otp"}
    }else{
        return {success: true,
                message: "transaction verified"}
    }
}
module.exports = {OTPSigned, OTPVerify}