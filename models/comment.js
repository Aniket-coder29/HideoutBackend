const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    postid:{
        type: String,
        required: true,
        unique: true
    },
    comments:[
        {
            userid:{
                type: String,
                required: true,
                unique: true
            },
            comment:{
                type: String,
            },
        }
    ],
    total:{
        type:Number,
        default: 0
    }
},
{timestamps: true}
);

const comments = mongoose.model('comments',commentSchema);

module.exports(comments);