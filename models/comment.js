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
            creationTime:{
                type:TimeRanges,
                required: true
            },
            creationDate:{
                type: Date,
                required: true
            },
            lastEditedAt:{
                type: String,
                required: true
            }
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