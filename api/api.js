var express = require('express');

const api = express.Router();

const user = require('./user');
const product = require('./product');
const cart = require('./cart');

api.use('/user', user);
api.use('/product', product);
api.use('/cart', cart)

api.get('/',function(req,res) {
    res.json({
        msg: 'mssg from api'
    })
})
module.exports = api;