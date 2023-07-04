const mongoose = require('mongoose')

const commentv2Schema = new mongoose.Schema({
    postid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'postv2'
    },
    uid: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    likes: [
        {
            type: String,
        }
    ],
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'replysv2'
        }
    ]
},
    { timestamps: true }
);

const commentv2 = mongoose.model('commentsv2', commentv2Schema);

module.exports = commentv2;