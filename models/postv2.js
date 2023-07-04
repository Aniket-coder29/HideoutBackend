const mongoose = require('mongoose');

const postv2Schema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
    videos: [
        {
            type: String,
        },
    ],
    likes: [
        {
            type: String,
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'commentsv2'
        }
    ]
    },
    { timestamps: true }
);

const postv2 = mongoose.model("postv2", postv2Schema);

module.exports = postv2;