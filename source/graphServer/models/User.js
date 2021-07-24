const { model, Schema } = require('mongoose');


const userSchema = new Schema({
    username: String,
    password: String,
    saltKey: String,
    createdAt: String,
    email: String,
});

module.exports.User = model('User', userSchema);