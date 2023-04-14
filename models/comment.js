const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    postid: {
        type: String,
        required: true,
        unique: true
    },
    comments: [
        {
            uid: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
            },
            replies: [
                {
                    uid: {
                        type: String,
                        required: true,
                    },
                    reply: {
                        type: String,
                    },
                },
            ]
        }
    ],
},
    { timestamps: true }
);

const comments = mongoose.model('comments', commentSchema);

module.exports = comments;