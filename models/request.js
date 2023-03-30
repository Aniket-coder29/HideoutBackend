const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        unique: true
    },
    requests:[
        {
            type: String,
            required: true,
        },
        {timestamps:true}
    ],
})

const request = mongoose.model("Request",requestSchema);

module.exports= request;