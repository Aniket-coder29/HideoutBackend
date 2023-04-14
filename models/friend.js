const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: String,
        },
        { timestamps: true }
    ],
})

const friend = mongoose.model("Friend", friendSchema);

module.exports = friend;