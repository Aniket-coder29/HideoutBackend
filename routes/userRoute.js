//user routes will be here
const router = require('express').Router();
const { getUserDetails, getAllUsers, createUser, updateUser, deleteUser, checkUser, getMiniDetails, getAllUserData } = require('../controller/UserController')

router.get('/getUserDetails',getUserDetails);

router.get('/getMiniDetails', getMiniDetails)

router.get('/getAllUsers',getAllUsers);

router.get('/create',createUser);

router.put('/update',updateUser);

router.get('/delete',deleteUser);

router.get('/checkuser',checkUser);

router.get('/getUserDataBase', getAllUserData)

module.exports = router;
