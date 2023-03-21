const express = require('express')
const app=express();
const dotenv=require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const middleware = require('./middleware/index')
const userRoute = require('./routes/userRoute')
const friendRoute = require('./routes/friendRoute')
require('./config/db')
require('./config/firebase')

// const api = require('./api')

app.use(express.json());  //in case we pass any json input
app.use(cors());
// app.use(middleware.decodeToken);

app.get('/',(req,res)=>res.send('THIS IS BACKEND'))
app.use('/api/user',middleware.decodeToken,userRoute);
app.use('/api/friend',middleware.decodeToken,friendRoute);
// app.get('/api/task',(req,res)=>{
//     return res.json({
//         tasks:[
//             {title: 'Task 1',},
//             {title : 'Task 2',},
//         ],
//     });
// });
// app.use('/',api)



app.listen(port,()=>console.log('backend running at '+port))

module.exports = app;