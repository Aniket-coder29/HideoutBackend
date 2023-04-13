const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    friends: [
        {
            uid: {
                type: String,
            },
            name: {
                type: String,
            },
            designation: {
                type: String,
            },
            photo: {
                type: String,
            }
        },
        { timestamps: true }
    ],
})

const friend = mongoose.model("Friend", friendSchema);

module.exports = friend;