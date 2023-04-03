const User = require('../models/user');

const getUserDetails = async(req,res)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const uid = req.query.uid? req.query.uid: user.uid

            if(!uid)
                return res.status(500).json({"error":"no uid passed"})
            
            const filter = {uid: uid}
            const userDetails = User.find(filter,(err,docs)=>{
                if(err){
                    // console.log(err)
                    return res.status(200).json(err)
                }
                else{
                    // console.log(docs)
                    return res.status(200).json(docs)
                }
            });           

        }catch(error){
            return res.status(500).json(error)
        }
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const getAllUsers = async(req,res)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const userDetails = User.find({},(err,docs)=>{
                if(err){
                    // console.log(err)
                    return res.status(200).json(err);
                }
                else{
                    // console.log(docs)
                    return res.status(200).json(docs);
                }
            });           

        }catch(error){
            return res.status(500).json(error);
        }
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const createUser = async(req,res)=>{
    if(res.locals.user){
        try{
            // console.log(req.query.name)
            const user = res.locals.user;
            const newUser = {
                // name: req.query.name || "Yash",
                photo: user.picture,
                email: user.email,
                uid: user.uid,
            }
            // console.log(newUser);
            const newuserSave= new User(newUser);
            // console.log(newuserSave)
            const saveUser= await newuserSave.save((err,docs)=>{
                if(err){
                    // console.log(err)
                    return res.status(200).json(err)
                }
                else{
                    return res.status(200).json({
                        status: 'User saved successfully',
                        User : docs,
                    })
                }
            });
        }
        catch(error){
            return res.status(500).json(error);
        }
    }
    else{
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const updateUser = async(req,res)=>{
    if(res.locals.user){
        try{
            // console.log(req.query)
            const user = res.locals.user;
            const filter = {uid: user.uid};
            const findUser = await User.findOneAndUpdate(filter,req.query)
            return res.status(200).json({
                status: 'User updated successfully',
                User : findUser,
            })
            
        }
        catch(error){
            return res.status(500).json(error);
        }
    }
    else{
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const deleteUser = async(req,res)=>{
    if(res.locals.user){
        try{
            const user = res.locals.user;
            const filter = {uid: user.uid};
            const findUser = await User.deleteOne(filter)
            return res.status(200).json({
                status: 'User deleted successfully',
                User : findUser,
            })
            
        }
        catch(error){
            return res.status(500).json(error);
        }
    }
    else{
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

const checkUser = async(req,res)=>{
    if(res.locals.user){
        const user = res.locals.user;
        const email = user.email;
        const findEmail = await User.find({email: email});

        if(findEmail.length>0){
            return res.status(200).json({
                User : 1,
                //1 means already exists, 0 means new user
            })
        }
        else{
            return res.status(200).json({
                User : 0,
                //1 means already exists, 0 means new user
            })
        }
    }
    else{
        //redirect to login
        res.status(404).json({
            "User" : 'Not logged in',
        })
    }
};

module.exports = {checkUser,getAllUsers,getUserDetails,createUser,deleteUser,updateUser};
