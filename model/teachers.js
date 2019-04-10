var mongoose = require('mongoose');


var teachersSchema = new mongoose.Schema({
    f_name: {
        type: String,    
    },
    l_name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zip: {
        type: String,
    },

});

const Teachers = (module.exports = mongoose.model("Teacher", teachersSchema));