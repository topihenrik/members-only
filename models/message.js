const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        timestamp: {type: Date, required: true, default: Date.now},
        author: {type: Schema.Types.ObjectId, ref: "User"}
    }
)

module.exports = mongoose.model("Message", MessageSchema);