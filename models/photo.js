const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({

    postid:{
        type: String,
        required: true,
        unique: true
    },
    photos:[
        {
            photo:{
                type: URL,
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

const photos = mongoose.model('photos',photoSchema);

module.exports(photos);