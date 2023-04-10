const User = require('../models/user')

const getDetails = async (uid) => {
    const filter = { uid: uid }
    let retVal ={}
    const userDetails = await User.findOne(filter, (err, docs) => {
        if (err) {
            // console.log(err)
            retVal= { status: 0, error: err }
        }
        else {
            // console.log(docs)
            retVal= { status: 1, data: docs }
        }
    }).clone();
    // console.log("Ending sevice")
    return retVal
}

module.exports = { getDetails }