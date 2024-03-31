const credentials = require("../../credentials")

const AccessKeyValidate = async (req, res, next) => {
    const {key, hostName } = req.header
    if(!key || !hostName){
        return res.json({
            success: false,
            message: "Missing infomation in access request through API"
        })
    }

    const partner = credentials.partner[hostName]
    if(!partner){
        return res.json({
            success: false,
            message: "Access request API in not available!"
        })
    }
    try{
        if(key != partner){
            return res.json({
                success: false,
                message: "Access key is invalid!"
            })
        }else{
            next()
        }
    }catch(error){
        return res.json({
            success: false,
            message: "Error occurred in partner key validate! " + error.message
        })
    }
}

module.exports = AccessKeyValidate