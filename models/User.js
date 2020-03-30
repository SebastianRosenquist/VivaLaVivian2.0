const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// SAR: We create the Schema for the username and password
const UserSchema = new Schema({
    username: String,
    password: String,
});

// SAR: Now we create the export model
const User = mongoose.model('User',UserSchema);
module.exports = User;