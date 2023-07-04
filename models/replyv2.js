const mongoose = require('mongoose')

const replyv2Schema = new mongoose.Schema({
    commentid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'commentv2'
    },
    uid: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
    },
    likes:[
        {
            type:String,
        }
    ],
    },
    { timestamps: true }
);

const replyv2 = mongoose.model('replysv2', replyv2Schema);

module.exports = replyv2;