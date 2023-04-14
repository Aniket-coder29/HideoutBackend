const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({

    uid: {
        type: String,
        required: true,
        unique: true
    },
    notifications: [
        new mongoose.Schema({
            notification: {
                type: String,
            },
        },
            { timestamps: true }
        )
    ],
}
);

const notifications = mongoose.model('notifications', notificationSchema);

module.exports(notifications);



// received req ->1  name who sent
// accept req->became friends->2 name who accepted 
// friend posted-> name who posted, (id,postid)
// friend liked->3 name who liked, (id,postid)
// friend commented->4 name who commented, (id,postid)
// friend replys->5.1-> name who replied,(id,postid) to jiska post hai
//5.2-> name who replied,(id,postid) to jiska comment hai