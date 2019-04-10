var mongoose = require('mongoose');


var usersSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return re.test(v);
            },
            message: '{VALUE} is not a valid Email!'
        },
        unique: true,
        require: true
    },
    password: {
        type: String,
        minlength: 5,
        require: true
    },
    name: {
        type: String,
        default : ""
    },
    phone: {
        type: Number,
        default: "",
        unique: true
    },
    address: [],

    active: {
        type: Boolean,
        default: true,
   }

});

const Users = module.exports = mongoose.model('User', usersSchema);