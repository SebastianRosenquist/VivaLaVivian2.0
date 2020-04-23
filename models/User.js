const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // SAR: We require the bcrypt package to encrypt our passwords

// SAR: We create the Schema/table for the username and password
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


// We tell Mongoose that before we save anything into the User table we execute the second function first.
UserSchema.pre('save', function (next) {
    const user = this;

// Now we encrypt the password a set amount of times before replacing the original password with the encrypted version.
    bcrypt.hash(user.password,13,(error, hash) =>{
        user.password = hash;
        next()
    })
});

// SAR: Now we create the export model
const User = mongoose.model('User',UserSchema);
module.exports = User;