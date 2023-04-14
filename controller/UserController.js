const User = require('../models/user');
const { getDetails, getMinDetails } = require('../services/userServices');

const getUserDetails = async (req, res) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            const uid = req.query.uid ? req.query.uid : user.uid

            if (!uid)
                return res.status(500).json({ "error": "no uid passed" })
            const userDetails = await getDetails(uid)
            // console.log(userDetails)
            if (userDetails.status) {
                return res.status(200).json(userDetails.data)
            }
            else {
                throw new Exception("Not able to find Details!");
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
};

const getAllUserData = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const userDetail = await User.find({}).clone().exec();
            return res.status(200).json(userDetail);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getMiniDetails = async (req, res) => {
    if (res.locals.user) {
        try {
            const user = res.locals.user;
            const uid = req.query.uid ? req.query.uid : user.uid

            if (!uid)
                return res.status(500).json({ "error": "no uid passed" })

            const userDetails = await getMinDetails(uid)
            if (userDetails.status) {
                return res.status(200).json(userDetails.data)
            }
            else {
                throw new Exception("Not able to find Details!");
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
}

const getAllUsers = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        try {
            const userDetail = await User.find({}).clone().exec();
            let retVal = []
            userDetail.forEach(element => {
                retVal.push({ uid: element.uid, name: element.name, photo: element.photo, designation: element.designation })
            });
            return res.status(200).json(retVal);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
};

const createUser = async (req, res) => {
    if (res.locals.user) {
        try {
            // console.log(req.query.name)
            const user = res.locals.user;
            const newUser = {
                // name: req.query.name || "Yash",
                photo: user.picture,
                email: user.email,
                uid: user.uid,
            }
            // console.log(newUser);
            const newuserSave = new User(newUser);
            // console.log(newuserSave)
            const saveUser = newuserSave.save((err, docs) => {
                if (err) {
                    // console.log(err)
                    return res.status(200).json(err)
                }
                else {
                    return res.status(200).json({
                        status: 'User saved successfully',
                        email: user.email,
                    })
                }
            });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(404).json({
            "User": 'Not logged in',
        })
    }
};

const updateUser = async (req, res) => {
    if (res.locals.user) {
        console.log(req.body)
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await User.findOneAndUpdate(filter, req.body).clone().exec()
            return res.status(200).json({
                status: 'User updated successfully',
            })
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(404).json({
            "User": 'Not logged in',
        })
    }
};

const deleteUser = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const uid = req.query.uid ? req.query.uid : user.uid
        const filter = { uid: uid };
        try {
            const findUser = await User.deleteOne(filter).clone().exec()
            return res.status(200).json({
                status: 'User deleted successfully',
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        return res.status(404).json({
            "User": 'Not logged in',
        })
    }
};

const checkUser = async (req, res) => {
    if (res.locals.user) {
        const user = res.locals.user;
        const email = user.email;
        const findEmail = await User.find({ email: email }).clone().exec();
        console.log(findEmail)
        if (findEmail.length > 0) {
            const userDetail = findEmail[0];
            if (userDetail.name && userDetail.name !== "") {
                return res.status(200).json({
                    User: 1,
                    email: email,
                    //1 means already exists, 0 means new user
                })
            }
            return res.status(200).json({
                User: 0,
                email: email
                //1 means already exists, 0 means new user
            })
        }
        else {
            return res.status(200).json({
                User: -1,
                //1 means already exists, 0 means new user
            })
        }
    }
    else {
        //redirect to login
        return res.status(404).json({
            status: 0,
            error: 'Not logged in',
        })
    }
};

module.exports = { checkUser, getAllUsers, getUserDetails, createUser, deleteUser, updateUser, getMiniDetails, getAllUserData };
