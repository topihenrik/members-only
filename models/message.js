const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        timestamp: {type: Date, required: true, default: Date.now},
        author: {type: Schema.Types.ObjectId, ref: "User"}
    }
)

// fix this
MessageSchema.virtual("timestamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
})

module.exports = mongoose.model("Message", MessageSchema);