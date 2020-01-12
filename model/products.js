var mongoose = require('mongoose');

var products = new mongoose.Schema({
    name: 'string',
    thuonghieu: 'string',
    xuatxu: 'string',
    loai: 'string',
    may: 'string',
    kinh: 'string',
    day: 'string',
    soluong: Number,
    dongia: Number,
    image: 'string',
    decribe: 'string'
}, { collection: 'products' }, {
    timestamps: { createdAt: 'createdAt' }
});
module.exports = mongoose.model('products', products);