var express = require('express');
var bcrypt = require('bcrypt');
const cart = express.Router();


const Carts = require('../model/carts');
const Products = require('../model/products');
const Users = require('../model/user');
cart.post('/', (req, res) => {
    Carts.find({user_id: req.body.id}).populate('user_id').populate('product_id').exec((err, succ) => {
       res.send(succ);
    })
});
cart.post('/remove', (req, res) => {
    Carts.deleteOne({_id: req.body.id}, (err, data)=> {
        if(!err){
            res.send(data);
        }
    })
})

cart.post('/updatecart', (req, res) => {
    Carts.find({_id: req.body.id}, (err, data)=> {
        if(req.body.type == 'plus'){
            
            data[0].no_of_product = data[0].no_of_product + 1;
            data[0].save((err, succ) => {
                res.send(succ);
            }, err => {
                console.log(err);
            })
        }else{
            if(data[0].no_of_product <= 1 ){
                Carts.deleteOne({_id: req.body.id}, (err, data)=> {
                    if(!err){
                        res.send(data);
                    }
                })
            }else{
                data[0].no_of_product = data[0].no_of_product - 1;
                data[0].save((err, succ) => {
                    res.send(succ);
                }, err => {
                    console.log(err);
                })
            }
        }
    })
})
cart.post('/add', (req, res)=> {
    Products.findById(req.body.id, (err, product) => {
        if(product){
            var product_id = product._id;

            Users.findById(req.body.user_id, (err, user) => {
                if(user){

                    Carts.find({user_id: user._id , product_id: product_id}, (err, getCart)=> {
                        if(getCart[0]){
                                                        
                            getCart[0].no_of_product = getCart[0].no_of_product + 1; 
                            getCart[0].save((err, succ) =>{
                                res.send(succ);
                            })
                        }else{
                            var user_id = user._id;
                            let newCart = new Carts({
                                user_id: user_id,
                                product_id: product_id,
                                total_product_cost: product.price,
                                total_cost: (parseInt(product.price) + parseInt(100))
                                // category: req.body.cat
                            });

                            newCart.save((err, succ) =>{
                                res.send(succ);
                            })
                        }
                    })
                    
                }
            })
            
            
        }
    });
});

module.exports = cart;