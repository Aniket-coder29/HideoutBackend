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