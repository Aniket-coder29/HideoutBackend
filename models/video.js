const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({

    postid: {
        type: String,
        required: true,
        unique: true
    },
    videos: [
        {
            video: {
                type: String,
            },
        }
    ],
    total: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

const videos = mongoose.model('videos', videoSchema);

module.exports(videos);