const User = require('../models/user')

const getDetails = async (uid) => {
    const filter = { uid: uid }
    console.log("get Details in user Services")
    try {
        const userDetails = await User.findOne(filter).clone().exec();
        console.log(userDetails)
        return {
            status: 1,
            data: userDetails
        }
    }
    catch (err) {
        return {
            status: 0,
            error: err
        }
    }
    // const userDetails = await User.findOne(filter, (err, docs) => {
    //     if (err) {
    //         // console.log(err)
    //         retVal= { status: 0, error: err }
    //     }
    //     else {
    //         // console.log(docs)
    //         retVal= { status: 1, data: docs }
    //     }
    // }).clone();
    // console.log(retVal)

}

const getMinDetails = async (uid) => {
    const filter = { uid: uid }
    const filter2 = "name photo designation uid"
    console.log("get Min Details in user Services")
    try {
        const userDetails = await User.findOne(filter, filter2).clone().exec();
        console.log(userDetails)
        return {
            status: 1,
            data: userDetails
        }
    }
    catch (err) {
        return {
            status: 0,
            error: err
        }
    }
}

module.exports = { getDetails, getMinDetails }