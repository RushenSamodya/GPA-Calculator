const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const selectiveSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isSpecial: {
        type: Boolean,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    combinationType: {
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("SelectiveModule", selectiveSchema);