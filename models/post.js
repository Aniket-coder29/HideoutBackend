const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    posts: [
        new mongoose.Schema({
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
        },
            { timestamps: true })
    ],
});

const post = mongoose.model("Post", postSchema);

module.exports = post;