var mongoose = require('mongoose');

var users = new mongoose.Schema({
    name: 'string',
    birthday: Date,
    address: 'string',
    gender: 'string',
    email: 'string',
    phone: 'string',
    role: 'string',
}, { collection: 'users' }, {
    timestamps: { createdAt: 'createdAt' }
});
module.exports = mongoose.model('users', users);