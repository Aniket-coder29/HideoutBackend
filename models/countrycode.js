const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    codes: {
        type: String,
        required: true
    },
});

const Countrycodes = mongoose.model("Country Code", codeSchema);

module.exports = Countrycodes;