//name, phone number, sum of all rating, total number of rating
const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    reviewSum: {
        type: Number,
        require: true
    },
    reviewCount: {
        type: String,
        require: true
    },

})

module.exports = mongoose.model('Object', objectSchema);