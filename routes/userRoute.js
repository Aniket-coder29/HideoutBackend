//user routes will be here
const router = require('express').Router();
const { getUserDetails, getAllUsers, createUser, updateUser, deleteUser, checkUser } = require('../controller/UserController')

router.get('/getUserDetails',getUserDetails);

router.get('/getAllUsers',getAllUsers);

router.get('/create',createUser);

router.put('/update',updateUser);

router.delete('/delete',deleteUser);

router.get('/checkuser',checkUser);

module.exports = router;
