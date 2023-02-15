const router = require('express').Router();
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
router.route('/login',userRoute)

module.exports=router;