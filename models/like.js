const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({

    postid:{
        type: String,
        required: true,
        unique: true
    },
    likes:[
        {
            userid:{
                type: String,
                required: true,
                unique: true
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

const like = mongoose.model('likes',likeSchema);

module.exports(like);