const mongoose = require('mongoose');

// mongoose.connect(url,{useNewUrlParser: true})

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }

}, { timestamps: true });

const URL = mongoose.model('url', urlSchema);

module.exports = URL;