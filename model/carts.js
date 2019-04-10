var mongoose = require('mongoose');


var cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    no_of_product: {
        type: Number,
        default: 1
    },
    total_product_cost: {
        type: Number,
        required: true
    },
    delevary_cost: {
        type: Number,
        default: 100
    },
    total_cost: {
        type: Number
    }

})

const Cart = module.exports = mongoose.model('Cart', cartSchema);