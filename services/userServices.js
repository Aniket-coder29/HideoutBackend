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

const searchUsers = async (name) => {
    try {
        let ret = new Set()
        const result1 = await User.find({ name: new RegExp(name, "i") }, "uid").clone().exec()
        for (let i of result1) {
            ret.add(i.uid)
        }
        const result2 = await User.find({ email: new RegExp(name, "i") }, "uid").clone().exec()
        for (let i of result2) {
            ret.add(i.uid)
        }
        const result3 = await User.find({ designation: new RegExp(name, "i") }, "uid").clone().exec()
        for (let i of result3) {
            ret.add(i.uid)
        }
        const result4 = await User.find({ about: new RegExp(name, "i") }, "uid").clone().exec()
        for (let i of result4) {
            ret.add(i.uid)
        }
        return {
            status: 1,
            data: ret
        }
    } catch (error) {
        return {
            status: 0,
            error: error
        }
    }
}

module.exports = { getDetails, getMinDetails, searchUsers }