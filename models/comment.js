const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    postid: {
        type: String,
        required: true,
        unique: true
    },
    comments: [
        new mongoose.Schema({
            uid: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
            },
            likes:[
                {
                    type:String,
                }
            ],
            replies: [
                new mongoose.Schema({
                    uid: {
                        type: String,
                        required: true,
                    },
                    reply: {
                        type: String,
                    },
                },
                    { timestamps: true }),
            ]
        },
            { timestamps: true })
    ],
}
);

const comments = mongoose.model('comments', commentSchema);

module.exports = comments;