var express = require('express');
var bcrypt = require('bcrypt');
const product = express.Router();

const Products = require('../model/products');
const Category = require('../model/category');

product.get('/', function(req, res){
    Products.find({}).populate('category').exec(function(err, succ) { 
        if(!err){
            res.send(succ)            
        }
    },err =>{
        console.log(err);        
    })
});
product.post('/add-prod',function(req, res) {
    // console.log(req.body);
    
    let newProd = new Products({
        name: req.body.name,
        desc: req.body.desc,
        image_path: req.body.image_path,
        quantity: req.body.quantity,
        price: req.body.price
        // category: req.body.cat
    });
    newProd.save((err, succ) => {
        if (!err) {
            
            Category.findById(req.body.category, (err, foundCat) => {
                // console.log(foundCat);
                
                if (err) {
                    res.send(err); 
                }else{
                    succ.category = foundCat;
                    succ.save((err, data) => {
                        if(err){
                            res.send(err); 
                        }else{
                            res.json({                
                                'data': succ
                            })
                        }
                    });
                }
            })
        } else {
            res.send(err);
        }
    })
})

product.post('/addtocart', (req, res)=>{
    Products.findById(req.body.id, (err, data) => {
        
    })
})


module.exports = product