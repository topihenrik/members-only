const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        member_status: {type: String, required: true, enum: ["guest", "member"]}
    }
);

UserSchema.virtual("fullname").get(function() {
    let fullname = "";

    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`;
    }
    
    if (!this.first_name || !this.last_name) {
        fullname = "";
    }

    return fullname
})

module.exports = mongoose.model("User", UserSchema);