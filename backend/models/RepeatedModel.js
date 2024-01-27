const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RepeatedSchema = new Schema({
    title: {
        type: String,
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
    
    user_id:{
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("RepeatedModule", RepeatedSchema);