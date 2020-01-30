const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    dates: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Date"
        }
    ],
    notes: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
        }
    ],
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    cratedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Date', userSchema)