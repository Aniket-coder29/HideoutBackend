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
            creationDate:{
                type: Date,
                required: true
            },
            creationTime:{
                type: TimeRanges,
                required: true
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