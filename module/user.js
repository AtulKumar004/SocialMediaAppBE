const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
    }, 
    mobileNo: {
        type : String,
        require: true,
        maxLength: 10,
    }
});


module.exports = mongoose.model("User" ,UserSchema )