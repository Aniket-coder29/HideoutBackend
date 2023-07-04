const express = require('express')
const app=express();
const dotenv=require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const middleware = require('./middleware/index')
const userRoute = require('./routes/userRoute')
const friendRoute = require('./routes/friendRoute')
const postRoute = require('./routes/postRoute')
const notificationRoute = require('./routes/notificationRoute')
const postRoutev2 = require('./routes/postRoutev2')
require('./config/db')
require('./config/firebase')

// const api = require('./api')

app.use(express.json());  //in case we pass any json input
app.use(cors());
// app.use(middleware.decodeToken);

app.get('/',(req,res)=>res.send('THIS IS BACKEND'))
app.use('/api/user',middleware.decodeToken,userRoute);
app.use('/api/friend',middleware.decodeToken,friendRoute);
app.use('/api/post',middleware.decodeToken,postRoute);
app.use('/api/notification',middleware.decodeToken,notificationRoute);
app.use('/api/v2/post',middleware.decodeToken,postRoutev2);

app.listen(port,()=>console.log('backend running at '+port))

module.exports = app;