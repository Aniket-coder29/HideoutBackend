const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
        unique: true
    },
    friends:[
        {
            friendId:{
                type: String,
                required: true,
                unique: true
            },
        },
        {timestamps:true}
    ],
    totalFriends:{
        type: Number,
        default: 0
    }
})

const friend = mongoose.model("Friend",friendSchema);

module.exports= friend;