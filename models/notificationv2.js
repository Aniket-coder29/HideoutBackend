const mongoose = require('mongoose')

const notificationv2Schema = new mongoose.Schema({

    uid: {
        type: String,
        required: true,
        unique: true
    },
    action: {
        type: Number
    },
    senderUid: {
        type: String,
    },
    postUid: {
        type: String,
    },
    postid: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const notificationv2 = mongoose.model('notificationsv2', notificationv2Schema);

module.exports = notificationv2;



// received req ->1  name who sent
// accept req->became friends->2 name who accepted
// friend posted->3 name who posted, (id,postid)
// friend liked->4 name who liked, (id,postid)
// friend commented->5 name who commented, (id,postid)
// friend replys->6.1-> name who replied,(id,postid) to jiska post hai
//6.2-> name who replied,(id,postid) to jiska comment hai