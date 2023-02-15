// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose= require('mongoose');

mongoose.set('strictQuery', false)
const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    console.log("Connected to db");
    // console.log(result);
})
.catch((err)=>{
    console.log("Error in connecting Mongo Database");
    console.log(err);
})

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });