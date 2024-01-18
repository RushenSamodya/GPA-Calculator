const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    result: {
        type: String
    },
    user_id:{
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);