const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    address: {
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: String,
        }
    },
    dob: {
        type: Date
    },
    photo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
    },
    coverPhoto: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    social_links: {
        linkedIn: {
            type: String,
        },
        instagram: {
            type: String,
        },
        github: {
            type: String,
        },
        otherLinks: [
            {
                link: {
                    type: String
                },
            }
        ]
    },
    about: {
        type: String,
    },
    designation: {
        type: String,
    }
},
    { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;