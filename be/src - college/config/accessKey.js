const credentials = require("../credentials")

const accessKey = () => {
    let hostName = "tdtu"
    let accessKey = credentials.access_key

    const options ={
        headers: {
            hostName: hostName,
            accessKey: accessKey
        }
    }
}

module.exports = accessKey